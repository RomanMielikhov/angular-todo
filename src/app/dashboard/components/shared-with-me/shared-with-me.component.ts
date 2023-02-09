import { Component, OnInit } from '@angular/core';

import { IMainUserInfo } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss'],
})
export class SharedWithMeComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  dataSource: { [uid: string]: IMainUserInfo }[] = [];
  displayedColumns: string[] = ['name', 'email', 'read', 'write'];

  ngOnInit(): void {
    // this.userService.user.subscribe((user) => {
    //   this.dataSource = Object.values(user?.sharedWithMe || {});
    // });
  }
}
