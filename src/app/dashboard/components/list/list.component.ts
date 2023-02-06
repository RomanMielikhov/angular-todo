import { Component, Input, OnInit } from '@angular/core';
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
  public editing: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    header: ['', [Validators.required]],
    todoTitle: ['', [Validators.required]],
  });

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getItems();
    this.form.patchValue({ header: this.data.title });
  }

  private getItems(): void {
    this.todoService.getListItems(this.userId, this.data.id!);
    // .subscribe((items) => {
    //   const orders = this.data.orderOfItems;

    //   this.items = items.sort(
    //     (a, b) => orders.indexOf(a.id!) - orders.indexOf(b.id!)
    //   );
    // });
  }

  public onEditStart(): void {
    this.editing = true;
  }

  public rename(event: Event): void {
    this.editing = false;
    this.todoService.updateList(this.data.id!, this.userId, {
      ...this.data,
      title: this.form.value.header,
    });
    // .subscribe(
    //   (item: IToDoItem) =>
    //     (this.items = this.items.map((el) => (el.id === item.id ? item : el)))
    // );
  }

  public delete(id: string): void {
    this.todoService.deleteListItem(this.data.id!, this.userId, id);
    // .subscribe(
    //   (itemId) => (this.items = this.items.filter((el) => el.id !== itemId))
    // );
  }

  public add(event: Event): void {
    this.todoService.addListItem(
      this.data.id!,
      this.userId,
      this.form.value.todoTitle
    );
    // .subscribe((item: IToDoItem) => {
    //   this.items.push(item);
    //   this.form.patchValue({ todoTitle: '' });
    // });
  }

  public drop(event: CdkDragDrop<IToDoItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.todoService.updatePosition(
        event.container.id,
        this.userId,
        event.container.data.map((e) => e.id!)
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.todoService.moveItem(
        event.previousContainer.id,
        event.container.id,
        this.userId,
        event.item.data,
        event.container.data.map((e) => e.id!)
      );
      // .subscribe((id) => {
      //   this.items = this.items.map((el) =>
      //     el.id === event.item.data.id ? { ...el, id } : el
      //   );
      // });
    }
  }
}
