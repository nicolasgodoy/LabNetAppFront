import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { ProfilesService } from 'src/app/service/profiles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private auth: AuthService,
    private route: Router,
    private formB: FormBuilder,
    private _snackBar: MatSnackBar,
    private profileService: ProfilesService
  ) {
    this.formLogin = this.formB.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]]
    });

  }

  ngOnInit(): void {

  }

  logUser() {

    if (this.formLogin.valid) {
      const uLogin: Login = {
        UserName: this.formLogin.value.userName,
        Password: this.formLogin.value.password
      }

      this.auth.login(uLogin).subscribe(resp => {

        if (resp.isSuccess && resp.result.token.length > 2) {

          //CREAR PERFIL O CONSUTLAR PERFIL
          const token = this.auth.readToken();
          const userObject = this.auth.DecodeJWT(token);
          console.log(userObject);

          const id = this.auth.getValueByKey(userObject,'IdUser');
          console.log(id);
          this.profileService.HasProfile(id).subscribe(
            res => {
              console.log(res);
              if (res.result)
                this.route.navigateByUrl('/consult-profile/'+id)
              else
              this.route.navigateByUrl('/add-profile/'+id)
            }
          )
          //this.route.navigateByUrl('/user/insert');

        } else {
          //agregar mensaje 
          this.route.navigateByUrl('/login');
        }
      })


    }

  }

}
