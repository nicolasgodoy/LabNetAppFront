import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseDto } from 'src/app/models/response';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/user'
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
  ) {
    this.formUser = this.formB.group({
      mail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com)$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]],
      confirmPassword: ['',[Validators.required ]],
      idRole: ['', Validators.required]
    },{validator: this.checkPassword});
  }

  addUser(): void {
    if (this.formUser.valid) {
      const newUser: User = {
        email: this.formUser.value.mail,
        password: this.formUser.value.password,
        idRole: this.formUser.value.idRole,
        isActive: true
      };

      this._userService.addUser(newUser).subscribe(
        (response: User) => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'El usuario se agrego con exito!',
          })
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

  checkPassword(group: FormGroup) {
    const _newPass = group.get("password").value;
    const _confirmPass = group.get("confirmPassword").value;
    if(_newPass!==_confirmPass){
      group.get("confirmPassword").setErrors({notSame:true});
    }else{
      group.get("confirmPassword").setErrors(null)
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
