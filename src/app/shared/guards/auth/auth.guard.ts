import { Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public router: Router) {}
}
