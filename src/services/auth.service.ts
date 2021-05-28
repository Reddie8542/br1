import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated$ = new BehaviorSubject<boolean>(firebase.auth().currentUser != null);

  constructor(private router: Router) {}

  signIn(username: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => this.authenticated$.next(true));
  }

  signOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        this.authenticated$.next(false);
        this.router.navigate(['/journal']);
      });
  }
}
