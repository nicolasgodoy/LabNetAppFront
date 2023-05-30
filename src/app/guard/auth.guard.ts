import { AuthService } from "../service/auth.service";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private auth: AuthService, private router: Router) { }
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isAuthenticated()) {
        return true;
      } else {
        this.router.navigateByUrl('/user');
        return false;
      }
  
    }
  
  }