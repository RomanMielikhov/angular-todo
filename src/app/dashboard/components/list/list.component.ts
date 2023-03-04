import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { IUserToDoList } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from 'src/app/shared/services/todo/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly todoService: TodoService
  ) {}

  @Input('data') data!: IUserToDoList;
  @Input('todoId') todoId!: number;

  public editing: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    header: ['', [Validators.required]],
    text: ['', [Validators.required]],
  });

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form.patchValue({ header: this.data.header });
  }

  public onEditStart(): void {
    this.editing = true;
  }

  public rename(event: Event): void {
    this.editing = false;

    this.todoService
      .updateList(this.todoId, {
        ...this.data,
        header: this.form.value.header,
      } as IUserToDoList)
      .subscribe();
  }

  public deleteItem(id: string): void {
    this.todoService.deleteListItem(this.todoId, this.data.id, id).subscribe();
  }

  public add(event: Event): void {
    this.todoService
      .addListItem(this.todoId, this.data.id, this.form.value.text)
      .subscribe();
  }

  public drop(event: CdkDragDrop<IUserToDoList>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.items,
        event.previousIndex,
        event.currentIndex
      );

      this.todoService
        .moveItemInArray(this.todoId, event.container.data)
        .subscribe();
    } else {
      transferArrayItem(
        event.previousContainer.data.items,
        event.container.data.items,
        event.previousIndex,
        event.currentIndex
      );

      this.todoService
        .transferArrayItem(
          this.todoId,
          event.previousContainer.data,
          event.container.data
        )
        .subscribe();
    }
  }
}
