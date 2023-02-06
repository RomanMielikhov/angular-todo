import { Injectable } from '@angular/core';
import { map, from, Observable, zip, switchMap } from 'rxjs';

import { IToDoList, IToDoItem } from 'src/app/shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  public getLists(userId: string) {}

  public getListItems(userId: string, listId: string) {}

  public deleteListItem(listId: string, userId: string, itemId: string) {}

  public addList(userId: string, position: number) {}

  public removeList(id: string, userId: string) {}

  public addListItem(id: string, userId: string, title: string) {}

  public updateList(id: string, userId: string, list: IToDoList) {}

  public updatePosition(listId: string, userId: string, positions: string[]) {}

  public moveItem(
    fromListId: string,
    toListId: string,
    userId: string,
    item: IToDoItem,
    positions: string[]
  ) {}
}
