import { Injectable } from '@angular/core';
import {
  filter,
  map,
  tap,
  from,
  reduce,
  Observable,
  mergeMap,
  Subject,
  catchError,
} from 'rxjs';
import {
  Firestore,
  collection,
  CollectionReference,
  setDoc,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  writeBatch,
  deleteDoc,
  FieldValue,
  query,
  Query,
  getDoc,
  collectionData,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
  docSnapshots,
  collectionSnapshots,
  onSnapshotsInSync,
  QuerySnapshot,
} from '@angular/fire/firestore';

import { IToDoList, IToDoItem } from 'src/app/shared/interfaces/todo.interface';
import { idToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly firestore: Firestore) {}

  getLists(userId: string): Observable<IToDoList[]> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const q = query(colRef);

    return from(getDocs(q)).pipe(
      map((res) => {
        return res.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
      })
      // catchError((e, caught) => {
      //   console.log('ERROR', e, caught);
      //   return caught;
      // })
    );
  }

  getListItems(userId: string, listId: string): Observable<IToDoItem[]> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${listId}/items`
    ) as CollectionReference<IToDoItem>;

    const q = query(colRef);

    return from(getDocs(q)).pipe(
      map((res) => res.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  deleteListItem(
    listId: string,
    userId: string,
    itemId: string
  ): Observable<string> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${listId}/items`
    ) as CollectionReference<IToDoList>;

    const listDoc = doc<IToDoList>(colRef, itemId);

    return from(deleteDoc(listDoc)).pipe(map(() => itemId));
  }

  addList(userId: string, positions: number): Observable<IToDoList> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const data: IToDoList = {
      title: 'New List',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      position: positions,
    };

    return from(addDoc(colRef, data)).pipe(
      map((doc) => ({ id: doc.id, ...data }))
    );
  }

  removeList(id: string, userId: string): Observable<string> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const listDoc = doc<IToDoList>(colRef, id);

    return from(deleteDoc(listDoc)).pipe(map(() => id));
  }

  addListItem(
    id: string,
    userId: string,
    title: string
  ): Observable<IToDoItem> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${id}/items`
    ) as CollectionReference<IToDoList>;

    const data: IToDoItem = {
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return from(addDoc(colRef, data)).pipe(
      map((res) => ({ id: res.id, ...data }))
    );
  }

  updateList(
    id: string,
    userId: string,
    list: IToDoList
  ): Observable<IToDoList> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const data = { ...list, updatedAt: Date.now() };

    const listDoc = doc<IToDoList>(colRef, id);

    return from(updateDoc(listDoc, data)).pipe(map(() => ({ ...data, id })));
  }

  moveItem(
    fromListId: string,
    toListId: string,
    userId: string,
    item: IToDoItem
  ): Observable<void> {
    const batch = writeBatch(this.firestore);

    const fromColRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${fromListId}/items`
    ) as CollectionReference<IToDoList>;

    const fromDocRef = doc(fromColRef, item.id);

    batch.delete(fromDocRef);

    const toColRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${toListId}/items`
    ) as CollectionReference<IToDoList>;

    const toDocRef = doc<IToDoList>(toColRef);

    batch.set(toDocRef, item);

    return from(batch.commit());
  }
}
