import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LabNetAppFront';
  token: string = '';
  idUser: number;

  constructor(private _authService: AuthService, private _router: Router){
 
   }


   logout() {
    Swal.fire({
      title: 'Cierre de sesión',
      text: "Seguro que desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._authService.logout();
        this._router.navigateByUrl('/');
      }
    })
  }
}
