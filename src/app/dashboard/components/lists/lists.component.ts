import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IToDoList } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from 'src/app/shared/services/todo/todo.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  constructor(public todoService: TodoService, private route: ActivatedRoute) {
    this.route.params.subscribe(({ id }) => {
      this.todoService
        .getLists(this.userId)
        .subscribe((data) => (this.lists = data));
    });
  }

  lists: IToDoList[] = [];

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  public onAddList(): void {
    this.todoService
      .addList(this.userId)
      .subscribe((item) => this.lists.push(item));
  }

  public onRemoveList(listId: string): void {
    this.todoService.removeList(listId, this.userId).subscribe((deletedId) => {
      this.lists = this.lists.filter(({ id }) => deletedId !== id);
    });
  }

  public updateLists(ids: string[]): void {
    // ids.forEach((id) => {
    //   console.log(
    //     ' this.lists.find((list) => list.id! === id)?.items!',
    //     this.lists
    //   );
    //   this.todoService.updateListItems(
    //     id,
    //     this.userId,
    //     this.lists.find((list) => list.id! === id)?.items!
    //   );
    // });
  }
}
