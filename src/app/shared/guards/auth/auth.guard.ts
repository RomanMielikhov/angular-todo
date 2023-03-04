import { Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private userService: UserService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userService.getUser().pipe(map((user) => !!user));
  }
}
