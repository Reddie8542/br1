import firebase from 'firebase/app';
import 'firebase/firestore';
import { TestBed } from '@angular/core/testing';
import { JournalEntry } from 'src/models/journal-entry.model';
import { FirestoreService } from '../firestore.service';
import { JournalService } from './journal.service';
import { buildMockCollection } from 'src/utils/test-utils';

describe('JournalService', () => {
  let firestore: FirestoreService;
  let service: JournalService;
  const mockEntry: JournalEntry = {
    id: null,
    categoryId: null,
    name: null,
    url: null,
    date: null,
  };
  const mockCollection = buildMockCollection([mockEntry]);
  const none = 0;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FirestoreService, JournalService],
    });
    firestore = TestBed.inject(FirestoreService);
    spyOn(firestore, 'getCollection').and.returnValue(mockCollection);
    service = TestBed.inject(JournalService);
  });

  it('should interact with the firestore service when creating an entry', () => {
    const mockDocData: any = { id: mockEntry.id };
    spyOn(firestore, 'addDocument').and.returnValue(new Promise((resolve, reject) => resolve(mockDocData)));
    service.createEntry(mockEntry);
    expect(firestore.addDocument).toHaveBeenCalled();
  });

  it('should interact with the firestore service when deleting an entry', () => {
    spyOn(firestore, 'deleteDocument').and.returnValue(new Promise((resolve, reject) => resolve()));
    expect(firestore.deleteDocument).toHaveBeenCalledTimes(none);
    service.deleteEntry(mockEntry);
    expect(firestore.deleteDocument).toHaveBeenCalled();
  });

  it('should interact with the firestore service when updating an entry', () => {
    spyOn(firestore, 'updateDocument').and.returnValue(new Promise((resolve, reject) => resolve()));
    expect(firestore.updateDocument).toHaveBeenCalledTimes(none);
    service.updateEntry(mockEntry);
    expect(firestore.updateDocument).toHaveBeenCalled();
  });
});
