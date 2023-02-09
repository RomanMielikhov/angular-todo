import { Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.getUser().pipe(map((user) => !!user));
  }
}
