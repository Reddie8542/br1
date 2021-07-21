import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { firebaseConfig } from 'src/firebase.config';
import { FirestoreService } from 'src/services/firestore.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private firestore: FirestoreService, private storage: StorageService) {}

  ngOnInit() {
    firebase.initializeApp(firebaseConfig);
    this.firestore.setFirestore(firebase.firestore());
    this.storage.setStorage(firebase.storage());
  }
}
