import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { IUserToDo } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from 'src/app/shared/services/todo/todo.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit, OnDestroy {
  todos$: Observable<IUserToDo | null> = new Observable();
  destroy$ = new Subject();

  constructor(
    private readonly todoService: TodoService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe(() => {
      this.todoService.getLists(this.userId).subscribe();
    });
  }

  get userId(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos().pipe(takeUntil(this.destroy$));
  }

  public onAddList(todoId: number): void {
    this.todoService.addList(todoId).subscribe();
  }

  public onRemoveList(listId: string, todoId: number): void {
    this.todoService.removeList(listId, todoId).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
