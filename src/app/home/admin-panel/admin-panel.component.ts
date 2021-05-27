import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JournalEntry } from 'src/models/journal-entry.model';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-admin-panel',
  templateUrl: 'admin-panel.component.html',
  styleUrls: ['admin-panel.component.scss'],
})
export class AdminPanel implements OnInit, OnDestroy {
  entry: JournalEntry = {
    name: '',
    date: '',
    url: '',
  };
  entryForm!: FormGroup;
  sub: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.entryForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      url: this.fb.control(null, [Validators.required, Validators.pattern(urlRegex)]),
      date: this.fb.control(null, Validators.required),
    });
    this.sub = this.entryForm.valueChanges.subscribe((entry: JournalEntry) => (this.entry = entry));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCreate() {
    const entry = this.entryForm.value as JournalEntry;
    console.log(entry);
  }

  onReadNow(url: string) {
    window.open(url, '_blank');
  }
}
