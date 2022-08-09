import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collection,
  CollectionReference,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly firestore: Firestore) {}

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
