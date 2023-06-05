import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Token } from '@angular/compiler';
import { ProfilesService } from '../service/profiles.service';

@Injectable()
export class HasProfileGuard implements CanActivate {
  Token: string;
  idUser: number;
  hasProfile: boolean = false;
  constructor(private router: Router, private auth: AuthService, private profileService: ProfilesService) {
    this.Token = this.auth.readToken();
    const jsonObject = this.auth.DecodeJWT(this.Token);
    this.idUser = this.auth.getValueByKey(jsonObject, 'IdUser');
    this.hasProfile = false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Perform your URL check here

    this.profileService.HasProfile(this.idUser).subscribe({
      next: (resp) => {
        this.hasProfile = resp.result;
      }
    })
    
    console.log(this.hasProfile);
    if (this.hasProfile) {
      return true;
    } else {
      this.router.navigate(['/profile/add-profile/' + this.idUser]);
      return false;
    }
  }
}
