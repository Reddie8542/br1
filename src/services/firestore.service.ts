import firebase from 'firebase/app';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { collection } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore!: firebase.firestore.Firestore;

  addDocument<T>(collectionId: string, document: T) {
    const ref = this.firestore.collection(collectionId);
    return ref.add(document);
  }

  deleteDocument<T>(collectionId: string, docId: string) {
    const ref = this.firestore.collection(collectionId);
    return ref.doc(docId).delete();
  }

  fetchDocument(collectionId: string, docId: string) {
    const ref = this.firestore.collection(collectionId);
    return ref.doc(docId);
  }

  getCollection(id: string, opts?: { orderBy: { fieldName: string; order: 'asc' | 'desc' } }) {
    let query: firebase.firestore.Query<firebase.firestore.DocumentData>;
    query = this.firestore.collection(id);
    if (opts != null && opts.orderBy != null) {
      query = query.orderBy(opts.orderBy.fieldName, opts.orderBy.order);
    }
    return collection(query);
  }

  getDocumentByPath(path: string) {
    return this.firestore.doc(path);
  }

  setFirestore(firestore: firebase.firestore.Firestore) {
    this.firestore = firestore;
  }

  updateDocument<T>(collectionId: string, docId: string | undefined, document: T) {
    const ref = this.firestore.collection(collectionId);
    return ref.doc(docId).update(document);
  }
}
