import { Injectable } from '@angular/core';
import { from, map, Observable, filter, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IShare } from '../../interfaces/share.interface';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient
  ) {}

  list: { [id: string]: IShare } = {};

  getShareList(id: string) {}

  createShareList(uid: string): void {}

  addShareUser(userID: string, data: IShare) {}

  deleteShareUser(userID: string, data: IShare) {}
}
