import firebase from 'firebase/app';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { collection } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore!: firebase.firestore.Firestore;

  private preparePayload<T>(body: T | null | undefined): T {
    const clone = { ...body } as any;
    delete clone.id;
    return clone as T;
  }

  addDocument<T>(collectionId: string, document: T) {
    const collection = this.firestore.collection(collectionId);
    const body = this.preparePayload<T>(document);
    return collection.add(body);
  }

  deleteDocument(collectionId: string, docId: string) {
    const collection = this.firestore.collection(collectionId);
    return collection.doc(docId).delete();
  }

  fetchDocument(collectionId: string, docId: string) {
    const collection = this.firestore.collection(collectionId);
    return collection.doc(docId);
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

  updateDocument<T>(collectionId: string, document: T) {
    const collection = this.firestore.collection(collectionId);
    const body = this.preparePayload<T>(document);
    return collection.doc((document as any).id).update(body);
  }
}
