import { Injectable } from '@angular/core';
import { from, map, Observable, of, tap } from 'rxjs';
import { IMainUserInfo, IUser } from '../../interfaces/user.interface';
import { IShare } from '../../interfaces/share.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  public user: Observable<IUser | null> = new Observable();

  private getSearchParameters(string: string): string[] {
    return string.split('').reduce<string[]>((acc, e) => {
      const next = `${acc.at(-1) || ''}${e}`;
      return acc.concat(next.toLowerCase());
    }, []);
  }

  public getByName(name: any) {}

  public getUserInfo(id?: string): void {}

  public create() {}

  public addShareWithMe(item: IShare, uid: string) {}

  public deleteShareWithMe(item: IShare, uid: string) {}
}
