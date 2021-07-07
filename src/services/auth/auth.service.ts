import firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  get authenticated$() {
    return this._authenticated$.asObservable();
  }

  signIn(username: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => this._authenticated$.next(true));
  }

  signOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        this._authenticated$.next(false);
        this.router.navigate(['/']);
      });
  }
}
