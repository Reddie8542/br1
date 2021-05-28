import { Injectable } from '@angular/core';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private readonly JOURNAL_ENTRIES: string = 'journalEntries';

  constructor(private firestore: FirestoreService) {}

  createEntry(entry: JournalEntry) {
    return this.firestore.addDocument(this.JOURNAL_ENTRIES, entry);
  }

  getAllEntries() {
    return this.firestore.getCollection(this.JOURNAL_ENTRIES);
  }
}
