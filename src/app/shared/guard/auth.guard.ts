import { Injectable, OnDestroy } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Auth, Unsubscribe } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  constructor(public router: Router, private auth: Auth) {}
  private unsubscribe: Unsubscribe | null = null;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve) => {
      this.unsubscribe = this.auth.onAuthStateChanged((user) => {
        if (user) return resolve(true);
        return resolve(false);
      });
    });
  }

  ngOnDestroy(): void {
    // is it legal?
    if (this.unsubscribe) this.unsubscribe();
  }
}
