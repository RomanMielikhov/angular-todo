import { Component, Input, OnInit } from '@angular/core';

import { IToDoItem } from 'src/app/shared/interfaces/todo.interface';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: IToDoItem;

  constructor() {}
}
