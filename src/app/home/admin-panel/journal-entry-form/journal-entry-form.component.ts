import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal.service';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-journal-entry-form',
  templateUrl: 'journal-entry-form.component.html',
  styleUrls: ['journal-entry-form.component.scss'],
})
export class JournalEntryFormComponent implements OnInit, OnDestroy {
  @Input() showPreview: boolean = false;

  previewEntry: JournalEntry = {
    name: '',
    date: '',
    url: '',
  };
  entryForm!: FormGroup;
  sub: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private journal: JournalService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.entryForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      url: this.fb.control(null, [Validators.required, Validators.pattern(urlRegex)]),
      date: this.fb.control(null, Validators.required),
    });
    this.sub.add(this.entryForm.valueChanges.subscribe(this.onFormChanges.bind(this)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCreate(entry: JournalEntry) {
    this.journal
      .createEntry(entry)
      .then((docRef) => {
        this.entryForm.reset();
        this.snackbar.open('Journal entry created successfully.', 'Dismiss', { duration: 5 * 1000 });
      })
      .catch((error) => console.error(error));
  }

  onFormChanges(value: any) {
    const date = (value.date as moment.Moment).format();
    this.previewEntry = { ...value, date };
  }

  onReadNow(url: string) {
    window.open(url, '_blank');
  }
}
