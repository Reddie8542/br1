import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC94ZXOugnESjkdd-3wHIKQDE8bodt215g',
  authDomain: 'br1-fb.firebaseapp.com',
  databaseURL: 'https://br1-fb-default-rtdb.firebaseio.com',
  projectId: 'br1-fb',
  storageBucket: 'br1-fb.appspot.com',
  messagingSenderId: '338682339578',
  appId: '1:338682339578:web:ae9a19cd9ac4a3e8d6a943',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp(firebaseConfig);
  }
}
