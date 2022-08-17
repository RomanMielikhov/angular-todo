import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { from, map, Observable, of, filter, take } from 'rxjs';
import {
  Firestore,
  collection,
  CollectionReference,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  getDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { IShare } from '../../interfaces/share.interface';

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
    );
  }

  addShareUser(id: string, data: IShare): Observable<IShare> {
    const shareDocRef = doc(this.firestore, 'share', id) as DocumentReference<{
      [email: string]: IShare;
    }>;
    const { uid, ...res } = data;

    return from(
      // shareDocRef, {
      //   'roman@gmail.com': res,
      // }

      updateDoc(shareDocRef, { [uid!]: res })
    ).pipe(map(() => data));
  }

  deleteShareUser() {}

  editShareUser() {}
}
