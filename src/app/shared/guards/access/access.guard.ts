import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap, zip } from 'rxjs';
import { ShareService } from '../../services/share/share.service';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(
    public router: Router,
    private auth: Auth,
    private userService: UserService,
    private shareService: ShareService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id = route.params['id'];

    return zip([
      this.userService.user,
      this.shareService.getShareList(id),
    ]).pipe(
      map(([user, shareList]) => {
        if (!id || !user) return false;
        if (id === user.uid) return true;

        return shareList[user.uid!]?.read || false;
      })
    );
  }
}
