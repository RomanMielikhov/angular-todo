import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, tap, catchError, Observable, BehaviorSubject } from 'rxjs';

import { v4 as uuid } from 'uuid';

import {
  IUserToDo,
  IUserToDoList,
  IUserToDoListItem,
} from 'src/app/shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = new BehaviorSubject<IUserToDo | null>(null);

  constructor(private http: HttpClient) {}

  public getTodos(): Observable<IUserToDo | null> {
    return this.todos.asObservable();
  }

  public getLists(userId: string): Observable<IUserToDo> {
    return this.http.get<IUserToDo[]>('todos', { params: { userId } }).pipe(
      map(([list]) => list),
      tap((list) => this.todos.next(list)),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  public deleteListItem(
    todoId: number,
    listId: string,
    itemId: string
  ): Observable<IUserToDo> {
    const data = this.todos.getValue();

    const list = data!.list.map((e) => {
      if (e.id === listId)
        return { ...e, items: e.items.filter((e) => e.id !== itemId) };
      return e;
    });

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list,
      })
      .pipe(tap((data) => this.todos.next(data)));
  }

  public addList(todoId: number): Observable<IUserToDo> {
    const data = this.todos.getValue();

    const emptyList = {
      id: uuid(),
      header: 'Title',
      items: [],
    } as IUserToDoList;

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list: [...data!.list, emptyList],
      })
      .pipe(tap((data) => this.todos.next(data)));
  }

  public createList(userId: number): Observable<IUserToDo> {
    console.log('create user list');
    return this.http
      .post<IUserToDo>('todos', { userId, list: [] } as IUserToDo)
      .pipe(tap((data) => this.todos.next(data)));
  }

  public removeList(id: string, todoId: number): Observable<IUserToDo> {
    const data = this.todos.getValue();

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list: data!.list.filter((item) => item.id !== id),
      })
      .pipe(tap((data) => this.todos.next(data)));
  }

  public addListItem(
    todoId: number,
    listId: string,
    text: string,
    image: string | null
  ): Observable<IUserToDo> {
    const data = this.todos.getValue();

    const list = data!.list.find((e) => e.id === listId);

    const item = {
      id: uuid(),
      date: new Date().toISOString(),
      text,
      image,
    } as IUserToDoListItem;

    const items = [...list!.items, item];

    const todo = { ...list, items: items };

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list: data!.list.map((e) => (e.id === todo.id ? todo : e)),
      })
      .pipe(tap((data) => this.todos.next(data)));
  }

  public updateList(
    todoId: number,
    list: IUserToDoList
  ): Observable<IUserToDo> {
    const data = this.todos.getValue();

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list: data!.list.map((item) => (item.id == list.id ? list : item)),
      })
      .pipe(tap((data) => this.todos.next(data)));
  }

  public moveItemInArray(
    todoId: number,
    list: IUserToDoList
  ): Observable<IUserToDo> {
    const data = this.todos.getValue();

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list: data!.list.map((e) => (e.id === list.id ? list : e)),
      })
      .pipe(tap((data) => this.todos.next(data)));
  }

  public transferArrayItem(
    todoId: number,
    first: IUserToDoList,
    seconde: IUserToDoList
  ): Observable<IUserToDo> {
    const data = this.todos.getValue();

    return this.http
      .put<IUserToDo>(`todos/${todoId}`, {
        ...data,
        list: data!.list.map((e) => {
          if (e.id === first.id) return first;
          if (e.id === seconde.id) return seconde;

          return e;
        }),
      })
      .pipe(tap((data) => this.todos.next(data)));
  }
}
