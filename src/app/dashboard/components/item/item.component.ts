import { Component, Input } from '@angular/core';

import { IUserToDoListItem } from 'src/app/shared/interfaces/todo.interface';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: IUserToDoListItem;
}
