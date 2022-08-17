import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { from, map, Observable, of } from 'rxjs';
import {
  Firestore,
  collection,
  CollectionReference,
  setDoc,
  doc,
  getDoc,
  DocumentReference,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { IUser } from '../../interfaces/user.interface';

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

  getByName(name: any): Observable<any> {
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

  getUserInfo(id?: string): void {
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

  create(user: User) {
    const current: IUser = {
      uid: user.uid,
      name: user.displayName!,
      email: user.email!,
      sharedWith: [],
      positionsOfLists: [],
      searchParameters: [
        ...this.getSearchParameters(user.displayName!),
        ...this.getSearchParameters(user.email!),
      ],
    };

    const userDoc = doc(this.firestore, 'users', user.uid);

    return setDoc(userDoc, current);
  }
}
