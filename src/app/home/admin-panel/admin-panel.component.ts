import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JournalEntry } from 'src/models/journal-entry.model';
import { JournalService } from 'src/services/journal.service';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-admin-panel',
  templateUrl: 'admin-panel.component.html',
  styleUrls: ['admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  previewEntry: JournalEntry = {
    name: '',
    date: '',
    url: '',
  };
  entryForm!: FormGroup;
  sub: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private journal: JournalService) {}

  ngOnInit() {
    this.entryForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      url: this.fb.control(null, [Validators.required, Validators.pattern(urlRegex)]),
      date: this.fb.control(null, Validators.required),
    });
    this.sub.add(this.entryForm.valueChanges.subscribe((entry: JournalEntry) => (this.previewEntry = entry)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCreate(entry: JournalEntry) {
    entry.date = entry.date.format();
    this.journal
      .createEntry(entry)
      .then((docRef) => this.entryForm.reset())
      .catch((error) => console.error(error));
  }

  onReadNow(url: string) {
    window.open(url, '_blank');
  }
}
