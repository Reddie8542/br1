import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from '../firestore.service';
import { JournalService } from './journal.service';

describe('JournalService', () => {
  let firestore: FirestoreService;
  let service: JournalService;
  const mockEntry: JournalEntry = {
    id: null,
    category: null,
    name: null,
    url: null,
    date: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [JournalService],
    });
    firestore = TestBed.inject(FirestoreService);
    service = TestBed.inject(JournalService);
  });

  it('should update local state when creating a new entry', () => {
    const mockDocData: any = { id: mockEntry.id };
    spyOn(firestore, 'addDocument').and.returnValue(new Promise((resolve, reject) => resolve(mockDocData)));
    let entries = [...service.entries$.value];
    const empty = 0;
    expect(entries).not.toBeNull();
    expect(entries).not.toBeUndefined();
    expect(entries.length).toBe(empty);
    service.createEntry(mockEntry).then(() => {
      entries = [...service.entries$.value];
      expect(entries.length).toBeGreaterThan(empty);
      expect(entries[0]).toEqual(mockEntry);
    });
  });
});
