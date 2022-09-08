import { Injectable } from '@angular/core';
import { map, from, Observable, zip, switchMap } from 'rxjs';
import {
  doc,
  query,
  addDoc,
  getDocs,
  Firestore,
  updateDoc,
  deleteDoc,
  arrayUnion,
  collection,
  DocumentReference,
  CollectionReference,
} from '@angular/fire/firestore';

import { IToDoList, IToDoItem } from 'src/app/shared/interfaces/todo.interface';
import { idToken } from '@angular/fire/auth';
import { arrayRemove } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly firestore: Firestore) {}

  public getLists(userId: string): Observable<IToDoList[]> {
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
    );
  }

  public getListItems(userId: string, listId: string): Observable<IToDoItem[]> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${listId}/items`
    ) as CollectionReference<IToDoItem>;

    const q = query(colRef);

    return from(getDocs(q)).pipe(
      map((res) => res.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  public deleteListItem(
    listId: string,
    userId: string,
    itemId: string
  ): Observable<string> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${listId}/items`
    ) as CollectionReference<IToDoList>;

    const todoListRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const todoDoc = doc(todoListRef, listId);

    const listDoc = doc<IToDoList>(colRef, itemId);

    return from(deleteDoc(listDoc)).pipe(
      switchMap(() =>
        from(updateDoc(todoDoc, { orderOfItems: arrayRemove(itemId) })).pipe(
          map(() => itemId)
        )
      )
    );
  }

  public addList(userId: string, position: number): Observable<IToDoList> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const data: IToDoList = {
      title: 'New List',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      position: position,
      orderOfItems: [],
    };

    return from(addDoc(colRef, data)).pipe(
      map((doc) => ({ id: doc.id, ...data }))
    );
  }

  public removeList(id: string, userId: string): Observable<string> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const listDoc = doc<IToDoList>(colRef, id);

    return from(deleteDoc(listDoc)).pipe(map(() => id));
  }

  public addListItem(
    id: string,
    userId: string,
    title: string
  ): Observable<IToDoItem> {
    const colRef = collection(
      this.firestore,
      `users/${userId}/todo-lists/${id}/items`
    ) as CollectionReference<IToDoList>;

    const todoListRef = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const docRef = doc(todoListRef, id);

    const data = {
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as IToDoItem;

    return from(addDoc(colRef, data)).pipe(
      switchMap((res) =>
        from(updateDoc(docRef, { orderOfItems: arrayUnion(res.id) })).pipe(
          map(() => ({ id: res.id, ...data }))
        )
      )
    );
  }

  public updateList(
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

  public updatePosition(
    listId: string,
    userId: string,
    positions: string[]
  ): Observable<string[]> {
    const listCol = collection(
      this.firestore,
      `users/${userId}/todo-lists`
    ) as CollectionReference<IToDoList>;

    const listDoc = doc(listCol, listId);

    return from(
      updateDoc(listDoc, {
        orderOfItems: positions,
      })
    ).pipe(map(() => positions));
  }

  public moveItem(
    fromListId: string,
    toListId: string,
    userId: string,
    item: IToDoItem,
    positions: string[]
  ): Observable<string> {
    const fromItemsCol = collection(
      this.firestore,
      `users/${userId}/todo-lists/${fromListId}/items`
    ) as CollectionReference<IToDoList>;

    const { id, ...element } = item;

    const fromItemDoc = doc(fromItemsCol, id);

    const toItemsCol = collection(
      this.firestore,
      `users/${userId}/todo-lists/${toListId}/items`
    ) as CollectionReference<IToDoList>;

    const listCol = collection(this.firestore, `users/${userId}/todo-lists`);

    const fromListDoc = doc(
      listCol,
      fromListId
    ) as DocumentReference<IToDoList>;

    const toListDoc = doc(listCol, toListId) as DocumentReference<IToDoList>;

    return zip([
      from(addDoc(toItemsCol, element)),
      from(updateDoc(fromListDoc, { orderOfItems: arrayRemove(id) })),
      from(deleteDoc(fromItemDoc)),
    ]).pipe(
      switchMap(([docRef]) => {
        return from(
          updateDoc(toListDoc, {
            orderOfItems: positions.map((orderId) =>
              orderId === id ? docRef.id : orderId
            ),
          })
        ).pipe(map(() => docRef.id));
      })
    );
  }
}
