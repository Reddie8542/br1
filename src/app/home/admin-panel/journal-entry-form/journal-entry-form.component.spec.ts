import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalEntryFormComponent } from './journal-entry-form.component';

describe('JournalEntryFormComponent', () => {
  let component: JournalEntryFormComponent;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
      declarations: [JournalEntryFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(JournalEntryFormComponent);
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
