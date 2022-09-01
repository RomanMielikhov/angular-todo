import { Injectable } from '@angular/core';
import { from, map, Observable, of, tap } from 'rxjs';
import {
  collection,
  CollectionReference,
  setDoc,
  arrayRemove,
  doc,
  getDoc,
  DocumentReference,
  getDocs,
  where,
  query,
  arrayUnion,
  FieldValue,
  deleteField,
  updateDoc,
  Firestore,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { IMainUserInfo, IUser } from '../../interfaces/user.interface';
import { IShare } from '../../interfaces/share.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly firestore: Firestore) {}

  public user: Observable<IUser | null> = new Observable();

  private getSearchParameters(string: string): string[] {
    return string.split('').reduce<string[]>((acc, e) => {
      const next = `${acc.at(-1) || ''}${e}`;
      return acc.concat(next.toLowerCase());
    }, []);
  }

  public getByName(name: any): Observable<IUser[]> {
    if (typeof name !== 'string') return of([]);

    const colRef = collection(
      this.firestore,
      'users'
    ) as CollectionReference<IUser>;

    const q = query(
      colRef,
      where('searchParameters', 'array-contains', name.toLowerCase())
    );

    return from(getDocs(q)).pipe(
      map((res) => {
        return res.docs.map((doc) => doc.data());
      })
    );
  }

  // getLists(userId: string): Observable<any> {
  //   const colRef = collection(this.firestore, `users/${userId}/todo-lists`);
  //   // as CollectionReference<IToDoList>;

  //   const q = query(colRef);

  //   return from(getDocs(q));
  //   // .pipe(
  //   //   map((res) => {
  //   //     return res.docs.map((doc) => {
  //   //       return { id: doc.id, ...doc.data() };
  //   //     });
  //   //   })
  //   // );
  // }

  public getUserInfo(id?: string): void {
    if (!id) {
      this.user = of();
      return;
    }

    const userDoc = doc(
      this.firestore,
      'users',
      id
    ) as DocumentReference<IUser>;

    this.user = from(getDoc(userDoc)).pipe(map((doc) => doc.data()!));
  }

  public create(user: User) {
    const current: IUser = {
      uid: user.uid,
      name: user.displayName!,
      email: user.email!,
      sharedWithMe: [],
      searchParameters: [
        ...this.getSearchParameters(user.displayName!),
        ...this.getSearchParameters(user.email!),
      ],
    };

    const userDoc = doc(this.firestore, 'users', user.uid);

    return setDoc(userDoc, current);
  }

  public addShareWithMe(item: IShare, uid: string): Observable<void> {
    const { user, ...res } = item;
    const userDoc = doc(this.firestore, 'users', user!.uid!);

    return from(
      updateDoc(userDoc, {
        [`sharedWithMe.${uid}`]: { ...res, user: { ...user, uid } },
      })
    ).pipe(tap(() => this.getUserInfo(uid)));
  }

  public deleteShareWithMe(item: IShare, uid: string): Observable<void> {
    const userDoc = doc(this.firestore, 'users', item.user!.uid!);

    return from(
      updateDoc(userDoc, {
        [`sharedWithMe.${item.user!.uid!}`]: deleteField(),
      })
    ).pipe(tap(() => this.getUserInfo(uid)));
  }
}
