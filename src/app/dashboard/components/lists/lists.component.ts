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
    this.route.params.subscribe(() => {
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
      .addList(this.userId, this.lists.length)
      .subscribe((item) => this.lists.push(item));
  }

  public onRemoveList(listId: string): void {
    this.todoService.removeList(listId, this.userId).subscribe((deletedId) => {
      this.lists = this.lists.filter(({ id }) => deletedId !== id);
    });
  }
}
