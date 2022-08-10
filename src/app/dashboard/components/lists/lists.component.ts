import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IToDoList } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from 'src/app/shared/services/todo/todo.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  constructor(
    public todoService: TodoService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  lists: IToDoList[] = [];

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.userService.getUserInfo(this.userId);

    this.todoService
      .getLists(this.userId)
      .subscribe((data) => (this.lists = data));
  }

  onAddList() {
    this.todoService
      .addList(this.userId)
      .subscribe((item) => this.lists.push(item));
  }

  onRemoveList(listId: string) {
    this.todoService.removeList(listId, this.userId).subscribe((deletedId) => {
      this.lists = this.lists.filter(({ id }) => deletedId !== id);
    });
  }

  updateLists(ids: string[]) {
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
