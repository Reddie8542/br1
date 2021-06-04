import firebase from 'firebase/app';
import 'firebase/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db!: firebase.firestore.Firestore;

  initializeFirestore() {
    this.db = firebase.firestore();
  }

  addDocument<T>(collectionId: string, document: T) {
    return this.getCollection(collectionId).add(document);
  }

  getCollection(id: string) {
    return this.db.collection(id);
  }

  getDocument(collectionId: string, docId: string) {
    return this.getCollection(collectionId).doc(docId);
  }

  getDocumentByPath(path: string) {
    return this.db.doc(path);
  }
}
