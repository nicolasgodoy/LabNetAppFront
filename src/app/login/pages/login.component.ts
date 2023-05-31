import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';

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
    private _snackBar: MatSnackBar
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

          this.route.navigateByUrl('/user/insert');

        } else {
          //agregar mensaje 
          this.route.navigateByUrl('/login');
        }
      })


    }

  }

}
