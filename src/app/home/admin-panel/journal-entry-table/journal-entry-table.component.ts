import { Component } from '@angular/core';
import { JournalEntry } from 'src/models/journal-entry.model';

@Component({
  selector: 'app-journal-entry-table',
  templateUrl: 'journal-entry-table.component.html',
  styleUrls: ['journal-entry-table.component.scss'],
})
export class JournalEntryTableComponent {
  columns = ['name', 'date', 'url', 'actions'];
  data: JournalEntry[] = [
    { name: 'test', url: 'test', date: 'test' },
    { name: 'test', url: 'test', date: 'test' },
  ];
}
