import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ResponseDto } from 'src/app/models/response';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/user'
import { AuthService } from 'src/app/service/auth.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  formUser: FormGroup;
  listaRoles: Role[] = [];

  ngOnInit(): void {
    this.getRoles();
  }

  constructor(
    private formB: FormBuilder,
    private _userService: UserService,
    private _roleService: RoleService,
    private _auth: AuthService,
    private route : Router
  ) {
    this.formUser = this.formB.group({
      mail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com)$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]],
      idRole: ['', Validators.required]
    });
  }

  addUser(): void {
    if (this.formUser.valid) {
      const newUser: User = {
        Email: this.formUser.value.mail,
        Password: this.formUser.value.password,
        IdRole: this.formUser.value.idRole,
        IsActive: true
      };

      this._userService.addUser(newUser).subscribe(
        (response: User) => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'El usuario se agrego con exito!',
          })
          const token = this._auth.readToken();
          const userObject = this._auth.DecodeJWT(token);
          const id = this._auth.getValueByKey(userObject,'IdUser');

          this.route.navigateByUrl('/add-profile/'+id);
        },
        (error: any) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario no se pudo agregar!',
          })
        }
      );
    } else {
    }
  }

  getRoles() {
    this._roleService.getRole().subscribe({
      next: (response: ResponseDto) => {
        if (response.isSuccess) {
          this.listaRoles = response.result as Role[];
          console.log(this.listaRoles);

        } else {

        }
      },
      error: (error) => {

      },
    });
  }
}
