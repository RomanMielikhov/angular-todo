import { Injectable } from '@angular/core';
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
export class AccessGuard {
  constructor(
    public router: Router,
    private userService: UserService,
    private shareService: ShareService
  ) {}
}
