import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Token } from '@angular/compiler';
import { ProfilesService } from '../service/profiles.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class HasProfileGuard implements CanActivate {
  Token: string;
  idUser: number;
  hasProfile: boolean = false;
  constructor(private router: Router, private auth: AuthService, private profileService: ProfilesService) {
    this.Token = this.auth.readToken();
    const jsonObject = this.auth.DecodeJWT(this.Token);
    this.idUser = this.auth.getValueByKey(jsonObject, 'IdUser');
    this.hasProfile;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    if (id === this.idUser.toString()) {
      return this.profileService.HasProfile(this.idUser).pipe(
        map((resp) => {
          this.hasProfile = resp.result;
          if (this.hasProfile) {
            return true;
          } else {
            this.router.navigate(['/profile/add-profile/' + this.idUser]);
            return false;
          }
        })
      );
    }
    this.router.navigate(['/home'])
    return of(false);
  }
}
