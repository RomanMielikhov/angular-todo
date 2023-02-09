import { HostListener, Injectable } from '@angular/core';
import { from, map, Observable, BehaviorSubject, Subject, of, tap } from 'rxjs';
import { IMainUserInfo, IUser } from '../../interfaces/user.interface';
import { IShare } from '../../interfaces/share.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user = new BehaviorSubject<IMainUserInfo | null>(null);

  constructor() {}

  public getByName(name: any) {}

  public getUserInfo(id?: string): void {}

  public create() {}

  public addShareWithMe(item: IShare, uid: string) {}

  public deleteShareWithMe(item: IShare, uid: string) {}
}
