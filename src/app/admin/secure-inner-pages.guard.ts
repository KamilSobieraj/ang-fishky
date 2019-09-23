import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(public authService: AuthService,
              public router: Router
              ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
<<<<<<< HEAD
    if (this.authService.isLoggedIn) {
      alert('You shall not pass! Youre not allowed to access this URL...');
      this.router.navigate(['dashboard']);
    }
=======
    // if (this.authService.isLoggedIn) {
    //   alert('You shall not pass! Youre not allowed to access this URL...');
    //   this.router.navigate(['dashboard']);
    // }
>>>>>>> noauth
    return true;
  }
}
