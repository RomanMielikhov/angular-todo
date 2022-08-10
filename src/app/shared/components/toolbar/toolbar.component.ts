import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public userService: UserService) {}

  @Output() onUserClick = new EventEmitter<any>();

  onClick() {
    this.onUserClick.emit();
  }
}
