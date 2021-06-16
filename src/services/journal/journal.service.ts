import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEventCategory } from 'src/models/calendar-event-category.model';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private readonly JOURNAL_ENTRIES: string = 'journalEntries';
  private readonly JOURNAL_CATEGORIES: string = 'journalCategories';
  entries$: BehaviorSubject<JournalEntry[]> = new BehaviorSubject<JournalEntry[]>([]);
  categories$: BehaviorSubject<CalendarEventCategory[]> = new BehaviorSubject<CalendarEventCategory[]>([]);

  constructor(private firestore: FirestoreService) {}

  private replaceEntry(newValue: JournalEntry): void {
    const entries = [...this.entries$.value];
    const index = entries.findIndex((entry) => entry.id === newValue.id);
    entries[index] = newValue;
    this.entries$.next(entries);
  }

  private removeEntry(deletedEntry: JournalEntry) {
    const entries = [...this.entries$.value];
    const index = entries.findIndex((entry) => entry.id === deletedEntry.id);
    entries.splice(index, 1);
    this.entries$.next(entries);
  }

  private addEntry(id: string, entry: JournalEntry) {
    entry.id = id;
    const entries = [...this.entries$.value];
    entries.push(entry);
    this.entries$.next(entries);
  }

  createEntry(entry: JournalEntry) {
    const body = { ...entry } as JournalEntry;
    delete body.id;
    return this.firestore.addDocument(this.JOURNAL_ENTRIES, body).then((docRef) => this.addEntry(docRef.id, entry));
  }

  deleteEntry(entry: JournalEntry) {
    const id = entry.id as string;
    return this.firestore.deleteDocument(this.JOURNAL_ENTRIES, id).then(() => this.removeEntry(entry));
  }

  getAllEntries(): void {
    this.fetchAllEntries()
      .orderBy('date', 'asc')
      .get()
      .then((snapshot) => {
        const entries: JournalEntry[] = [];
        snapshot.forEach((doc) => {
          const entry = doc.data() as JournalEntry;
          entry.id = doc.id;
          entries.push(entry);
        });
        this.entries$.next(entries);
      });
  }

  fetchAllEntries() {
    return this.firestore.getCollection(this.JOURNAL_ENTRIES);
  }

  fetchAllJournalCategories() {
    return this.firestore.getCollection(this.JOURNAL_CATEGORIES);
  }

  getJournalCategory(id: string | null | undefined): CalendarEventCategory {
    const categories = [...this.categories$.value];
    const category = categories.find((item) => item.id === id);
    return { ...category } as CalendarEventCategory;
  }

  isEmpty(): boolean {
    return this.entries$.value.length <= 0;
  }

  hasCategories(): boolean {
    return this.categories$.value.length > 0;
  }

  updateEntry(entry: JournalEntry) {
    const body = { ...entry } as JournalEntry;
    delete body.id;
    return this.firestore
      .updateDocument(this.JOURNAL_ENTRIES, entry.id as string, body)
      .then(() => this.replaceEntry(entry));
  }
}
