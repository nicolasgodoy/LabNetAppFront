import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseDto } from 'src/app/models/response';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/user'
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';
import { Alert } from 'src/app/helpers/alert';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


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
    private dialogoReferencia: MatDialogRef<AddComponent>,

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
         
          Alert.mensajeAdd('Usuario');
          this.dialogoReferencia.close("creado");
          
        },
        (error: any) => {
          console.log(error)
          Alert.mensajeErrorCustom('El Usuario ya Existe')
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

        } else {

        }
      },
      error: (error) => {

      },
    });
  }
}
