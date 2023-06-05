import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  title = 'LabNetAppFront';
  idUser:number;
  IdRol:number;
  showNav = false;
  colorRol:string = "white";
  

  constructor(private _authService: AuthService, private _router: Router) {
    const token = this._authService.readToken();

    const Object = this._authService.DecodeJWT(token);
    
    this.IdRol= this._authService.getValueByKey(Object,'IdRol');
    console.log('ID log user:' + this.IdRol)
  }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        if (currentRoute == "/"){
          this.showNav = false;
          this.drawer.close();
        }
        else this.showNav = true;
      }
    });

    this.cambiarColorSidebar(this.IdRol);
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

  cambiarColorSidebar(IdRol: number){
    if(IdRol == 1){
      this.colorRol = "#24ABDD";
    }

    if(IdRol == 2){
      this.colorRol = "#BF71E1 ";
    }
  }
}
