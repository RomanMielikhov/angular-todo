import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const id = Number(route.params['id']);

    if (!id) return false;

    return this.userService.getUser().pipe(
      map((user) => {
        return (
          user!.id === id ||
          user!.sharedWithMe.some((shared) => shared.id === id)
        );
      })
    );
  }
}
