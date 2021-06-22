import firebase from 'firebase/app';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { collection } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db!: firebase.firestore.Firestore;

  initializeFirestore() {
    this.db = firebase.firestore();
  }

  addDocument<T>(collectionId: string, document: T) {
    const ref = this.db.collection(collectionId);
    return ref.add(document);
  }

  deleteDocument<T>(collectionId: string, docId: string) {
    const ref = this.db.collection(collectionId);
    return ref.doc(docId).delete();
  }

  getCollection(id: string, opts?: { orderBy: { fieldName: string; order: 'asc' | 'desc' } }) {
    let query: firebase.firestore.Query<firebase.firestore.DocumentData>;
    query = this.db.collection(id);
    if (opts != null && opts.orderBy != null) {
      query = query.orderBy(opts.orderBy.fieldName, opts.orderBy.order);
    }
    return collection(query);
  }

  fetchDocument(collectionId: string, docId: string) {
    const ref = this.db.collection(collectionId);
    return ref.doc(docId);
  }

  getDocumentByPath(path: string) {
    return this.db.doc(path);
  }

  updateDocument<T>(collectionId: string, docId: string | undefined, document: T) {
    const ref = this.db.collection(collectionId);
    return ref.doc(docId).update(document);
  }
}
