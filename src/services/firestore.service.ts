import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db!: firebase.firestore.Firestore;

  initializeFirestore() {
    this.db = firebase.firestore();
  }

  addDocument<T>(collectionId: string, document: T) {
    console.log(`Adding document to collecton ${collectionId}`, document);
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
