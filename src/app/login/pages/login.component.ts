import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    
      this.auth.login(uLogin).subscribe({
      next: (resp) => {
        if (resp.isSuccess && resp.result.token.length > 2) {
          const token = this.auth.readToken();
          const userObject = this.auth.DecodeJWT(token);
          console.log(userObject);
          const id = this.auth.getValueByKey(userObject, 'IdUser');
          console.log(id);

          this.profileService.HasProfile(id).subscribe(
            res => {
              console.log(res);
              if (res.result)
                this.route.navigateByUrl('/home')
              else
                this.route.navigateByUrl('profile/add-profile/' + id)
            })
        }
      },
      error: (e: any) => {
    
        if(e.error.message === 'La contraseña es incorrecta'){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña es Incorrecta!',
          })
        }else{

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario no existe!',
          })
          this.route.navigateByUrl('/login');

        }
      }

    })
  }
  }
}
