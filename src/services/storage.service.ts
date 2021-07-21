import firebase from 'firebase/app';
import 'firebase/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage!: firebase.storage.Storage;

  constructor(private http: HttpClient) {}

  private getImageBucket() {
    return this._storage.ref('assets/img/');
  }

  setStorage(storage: firebase.storage.Storage) {
    this._storage = storage;
  }

  getImage(name: string) {
    return this.getImageURL(name).pipe(switchMap((url) => this.http.get(url)));
  }

  getImageURL(name: string) {
    return from(this.getImageBucket().child(name).getDownloadURL()).pipe(take(1));
  }
}
