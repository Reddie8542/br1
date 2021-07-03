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

  createCategory(category: CalendarEventCategory) {
    return this.firestore.addDocument<CalendarEventCategory>(this.JOURNAL_CATEGORIES, category);
  }

  createEntry(entry: JournalEntry) {
    return this.firestore.addDocument<JournalEntry>(this.JOURNAL_ENTRIES, entry);
  }

  deleteCategory(category: CalendarEventCategory) {
    const id = category.id as string;
    return this.firestore.deleteDocument(this.JOURNAL_CATEGORIES, id);
  }

  deleteEntry(entry: JournalEntry) {
    const id = entry.id as string;
    return this.firestore.deleteDocument(this.JOURNAL_ENTRIES, id);
  }

  updateCategory(category: CalendarEventCategory) {
    return this.firestore.updateDocument<CalendarEventCategory>(this.JOURNAL_CATEGORIES, category);
  }

  updateEntry(entry: JournalEntry) {
    return this.firestore.updateDocument<JournalEntry>(this.JOURNAL_ENTRIES, entry);
  }
}
