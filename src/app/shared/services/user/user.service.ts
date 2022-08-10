import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import {
  Firestore,
  collection,
  CollectionReference,
  setDoc,
  doc,
  getDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly firestore: Firestore) {}

  public user: Observable<IUser | null> = new Observable();

  getUserInfo(id: string) {
    const userDoc = doc(
      this.firestore,
      'users',
      id
    ) as DocumentReference<IUser>;

    this.user = from(getDoc(userDoc)).pipe(map((doc) => doc.data()!));
  }

  create(user: User) {
    const current: IUser = {
      uid: user.uid,
      name: user.displayName!,
      email: user.email!,
      sharedWith: [],
      positionsOfLists: [],
    };

    const userDoc = doc(this.firestore, 'users', user.uid);

    return setDoc(userDoc, current);
  }
}
