import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IToDoList, IToDoItem } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from 'src/app/shared/services/todo/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  @Input('listData') data!: IToDoList;

  public items: IToDoItem[] = [];

  @Output() moveTodo: EventEmitter<string[]> = new EventEmitter();

  public form: FormGroup = new FormGroup({});
  public editing: boolean = false;

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.todoService
      .getListItems(this.userId, this.data.id!)
      .subscribe((items) => {
        this.items = items;
      });

    this.form = this.formBuilder.group({
      header: [this.data.title, [Validators.required]],
      todoTitle: ['', [Validators.required]],
    });
  }

  onEditStart(): void {
    this.editing = true;
  }

  rename(event: Event): void {
    this.editing = false;
    this.todoService
      .updateList(this.data.id!, this.userId, {
        ...this.data,
        title: this.form.value.header,
      })
      .subscribe(
        (item: IToDoItem) =>
          (this.items = this.items.map((el) => (el.id === item.id ? item : el)))
      );
  }

  delete(id: string): void {
    this.todoService
      .deleteListItem(this.data.id!, this.userId, id)
      .subscribe(
        (itemId) => (this.items = this.items.filter((el) => el.id !== itemId))
      );
  }

  add(event: Event): void {
    this.todoService
      .addListItem(this.data.id!, this.userId, this.form.value.todoTitle)
      .subscribe((item: IToDoItem) => {
        this.items.push(item);
        this.form.patchValue({ todoTitle: '' });
      });
  }

  drop(event: CdkDragDrop<IToDoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.todoService.moveItem(
        event.previousContainer.id,
        event.container.id,
        this.userId,
        event.item.data
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
