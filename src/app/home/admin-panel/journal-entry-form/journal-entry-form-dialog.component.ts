import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal/journal.service';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

export interface JournalEntryFormDialogComponentData {
  initValue?: JournalEntry;
}

@Component({
  selector: 'app-journal-entry-form-dialog',
  templateUrl: 'journal-entry-form-dialog.component.html',
  styleUrls: ['journal-entry-form-dialog.component.scss'],
})
export class JournalEntryFormDialogComponent implements OnInit, OnDestroy {
  @Input() showPreview: boolean = false;

  categories$!: Observable<CalendarEventCategory[]>;
  editMode = false;
  entryForm!: FormGroup;
  previewEntry: JournalEntry = {
    id: null,
    categoryId: null,
    name: null,
    date: null,
    url: null,
  };
  sub: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: JournalEntryFormDialogComponentData,
    private dialogRef: MatDialogRef<JournalEntryFormDialogComponent>,
    private fb: FormBuilder,
    private journal: JournalService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.entryForm = this.fb.group({
      id: this.fb.control(null),
      categoryId: this.fb.control(null),
      name: this.fb.control(null, Validators.required),
      url: this.fb.control(null, [Validators.required, Validators.pattern(urlRegex)]),
      date: this.fb.control(null, Validators.required),
    });
    this.categories$ = this.journal.categories$.asObservable();
    this.sub.add(this.entryForm.valueChanges.subscribe(this.onFormChanges.bind(this)));
    if (!this.journal.hasCategories()) {
      this.journal.fetchAllJournalCategories();
    }
    this.editMode = this.data != null;
    if (this.editMode) {
      const initValue = this.data.initValue;
      if (initValue != null) {
        this.entryForm.patchValue({ ...initValue, date: moment(initValue.date) });
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCreate(entry: JournalEntry) {
    this.journal
      .createEntry(entry)
      .then((docRef) => {
        this.snackbar.open('Journal entry created successfully.', 'Dismiss', { duration: 3 * 1000 });
        this.dialogRef.close();
      })
      .catch((error) => console.error(error));
  }

  onFormChanges(value: { name: string; url: string; date: moment.Moment; id: string; categoryId: string }) {
    let date: string = '';
    if (value.date != null) {
      date = value.date.format();
    }
    this.previewEntry = { ...value, date };
  }

  onSubmit(entry: JournalEntry) {
    if (this.editMode) {
      this.onUpdate(entry);
    } else {
      this.onCreate(entry);
    }
  }

  onReadNow(url: string | null | undefined) {
    window.open(url as string, '_blank');
  }

  onUpdate(entry: JournalEntry) {
    this.journal.updateEntry(entry).then(() => {
      this.snackbar.open('Journal entry updated successfully.', 'Dismiss', { duration: 5 * 1000 });
      this.dialogRef.close();
    });
  }
}
