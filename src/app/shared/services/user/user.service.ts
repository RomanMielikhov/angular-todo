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
  private userCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'users');
  }

  create(user: User) {
    const current: IUser = {
      uid: user.uid,
      name: user.displayName!,
      email: user.email!,
      sharedWith: [],
    };

    const userDoc = doc(this.firestore, 'users', user.uid);

    return setDoc(userDoc, current);
  }
}
