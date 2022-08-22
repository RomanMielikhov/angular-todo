import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { from, map, Observable, of, filter, take, catchError } from 'rxjs';
import {
  Firestore,
  collection,
  CollectionReference,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  deleteField,
  getDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { IShare } from '../../interfaces/share.interface';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private readonly firestore: Firestore) {}

  list: { [id: string]: IShare } = {};

  getShareList(id: string): Observable<{ [email: string]: IShare }> {
    const shareDocRef = doc(this.firestore, 'share', id) as DocumentReference<{
      [id: string]: IShare;
    }>;

    return from(getDoc(shareDocRef)).pipe(
      filter((res) => res.exists()),
      map((res) => res.data()!)
      // catchError((e, caught) => {
      //   console.log('ERROR', e, caught);
      //   return caught;
      // })
    );
  }

  createShareList(uid: string): void {
    const shareDocRef = doc(this.firestore, 'share', uid);

    setDoc(shareDocRef, {});
  }

  addShareUser(userID: string, data: IShare): Observable<IShare> {
    const shareDocRef = doc(
      this.firestore,
      'share',
      userID
    ) as DocumentReference<{
      [email: string]: IShare;
    }>;

    return from(updateDoc(shareDocRef, { [data.user!.uid!]: data })).pipe(
      map(() => data)
    );
  }

  deleteShareUser(id: string, el: IShare): Observable<void> {
    const shareDocRef = doc(this.firestore, 'share', id);

    return from(updateDoc(shareDocRef, { [el.user!.uid!]: deleteField() }));
  }

  editShareUser() {}
}
