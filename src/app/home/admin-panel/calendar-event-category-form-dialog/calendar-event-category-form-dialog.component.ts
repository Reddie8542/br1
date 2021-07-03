import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { JournalService } from 'src/services/journal/journal.service';

export interface CalendarEventCategoryFormDialogComponentData {
  initValue: CalendarEventCategory | null | undefined;
}

@Component({
  templateUrl: 'calendar-event-category-form-dialog.component.html',
  styleUrls: ['calendar-event-category-form-dialog.component.scss'],
})
export class CalendarEventCategoryFormDialogComponent implements OnInit {
  form!: FormGroup;
  editMode!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: CalendarEventCategoryFormDialogComponentData,
    private dialogRef: MatDialogRef<CalendarEventCategoryFormDialogComponent>,
    private fb: FormBuilder,
    private journal: JournalService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, Validators.required),
      color: this.fb.control(null, Validators.required),
    });
    this.editMode = this.data != null;
    if (this.editMode) {
      const initValue = this.data.initValue;
      if (initValue != null) {
        this.form.patchValue(initValue);
      }
    }
  }

  onCreate(category: CalendarEventCategory) {
    this.journal
      .createCategory(category)
      .then((docRef) => {
        this.snackbar.open('Category created successfully.', 'Dismiss', { duration: 3 * 1000 });
        this.dialogRef.close();
      })
      .catch((error) => console.error(error));
  }

  onSubmit(category: CalendarEventCategory) {
    if (this.editMode) {
      this.onUpdate(category);
    } else {
      this.onCreate(category);
    }
  }

  onUpdate(category: CalendarEventCategory) {
    this.journal
      .updateCategory(category)
      .then(() => {
        this.snackbar.open('Category updated successfully.', 'Dismiss', { duration: 3 * 1000 });
        this.dialogRef.close();
      })
      .catch((error) => console.error(error));
  }
}
