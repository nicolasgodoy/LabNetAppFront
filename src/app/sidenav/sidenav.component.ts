import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  colorRol: string = "white";
  IdUser:number
  IdRol:number
  private refresh = new Subject<void>();

  constructor(private _authService: AuthService, private _router: Router,private spinnerService: NgxSpinnerService){

  }



  ngOnInit(): void {

   
    
    const token = this._authService.readToken();

    const Object = this._authService.DecodeJWT(token);
      
      this.IdUser= this._authService.getValueByKey(Object,'IdUser');
      this.IdRol= this._authService.getValueByKey(Object,'IdRol');
      console.log('ID log user:' +this.IdRol);
      


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


