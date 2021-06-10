import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { JournalEntryFormDialogComponent } from './journal-entry-form-dialog.component';

describe('JournalEntryFormComponent', () => {
  let component: JournalEntryFormDialogComponent;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule],
      declarations: [JournalEntryFormDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(JournalEntryFormDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the preview updated with each change in the form', () => {
    const empty = { name: '', url: '', date: '' };
    const mockValue = {
      name: 'test',
      url: 'test',
      date: moment(new Date()),
    };
    expect(component.entryForm).not.toBeNull();
    expect(component.entryForm).not.toBeUndefined();
    expect(component.previewEntry).toEqual(empty);
    component.entryForm.patchValue(mockValue);
    expect(component.entryForm.value).toEqual(mockValue);
    const updated = component.previewEntry;
    expect(updated.name).toBe(mockValue.name);
    expect(updated.url).toBe(mockValue.url);
    expect(updated.date).toBe(mockValue.date.format());
  });
});
