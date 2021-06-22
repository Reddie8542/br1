import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private readonly JOURNAL_CATEGORIES = 'journalCategories';
  private readonly JOURNAL_ENTRIES = 'journalEntries';

  categories$ = this.firestore.getCollection(this.JOURNAL_CATEGORIES).pipe(
    map((docs) =>
      docs.map((doc) => {
        const category = { ...doc.data(), id: doc.id } as CalendarEventCategory;
        return category;
      })
    )
  );

  entries$ = this.firestore.getCollection(this.JOURNAL_ENTRIES, { orderBy: { fieldName: 'date', order: 'asc' } }).pipe(
    map((docs) =>
      docs.map((doc) => {
        const entry = { ...doc.data(), id: doc.id } as JournalEntry;
        return entry;
      })
    )
  );

  constructor(private firestore: FirestoreService) {}

  createEntry(entry: JournalEntry) {
    const body = { ...entry } as JournalEntry;
    delete body.id;
    return this.firestore.addDocument(this.JOURNAL_ENTRIES, body);
  }

  deleteEntry(entry: JournalEntry) {
    const id = entry.id as string;
    return this.firestore.deleteDocument(this.JOURNAL_ENTRIES, id);
  }

  updateEntry(entry: JournalEntry) {
    const body = { ...entry } as JournalEntry;
    delete body.id;
    return this.firestore.updateDocument(this.JOURNAL_ENTRIES, entry.id as string, body);
  }
}
