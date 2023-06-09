import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  colorRol: string = "white";
  IdUser:number
  IdRol:number
  @Input() showNav: boolean;

  constructor(private _authService: AuthService, private _router: Router,private spinnerService: NgxSpinnerService){

  }

  ngOnInit(): void {
      
  }
    
  refreshSide(){
    
    this.drawer.toggle();
    
    const token = this._authService.readToken();

    const Object = this._authService.DecodeJWT(token);
    
    this.IdUser= this._authService.getValueByKey(Object,'IdUser');
    this.IdRol= this._authService.getValueByKey(Object,'IdRol');
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
        this.drawer.close();
      }
    })
  } 
}


