import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import {
  from,
  map,
  Observable,
  of,
  filter,
  take,
  catchError,
  zip,
  switchMap,
} from 'rxjs';
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
import { IMainUserInfo } from '../../interfaces/user.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(
    private readonly firestore: Firestore,
    private readonly userService: UserService
  ) {}

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
      [uid: string]: IShare;
    }>;

    return zip([
      updateDoc(shareDocRef, { [data.user!.uid!]: data }),
      this.userService.addShareWithMe(data, userID),
    ]).pipe(map(() => data));
  }

  deleteShareUser(userID: string, data: IShare): Observable<IShare> {
    const shareDocRef = doc(this.firestore, 'share', userID);

    return zip([
      updateDoc(shareDocRef, { [data.user!.uid!]: deleteField() }),
      this.userService.deleteShareWithMe(data, userID),
    ]).pipe(map(() => data));
  }
}
