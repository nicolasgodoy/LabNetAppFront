import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UpdatePassword } from 'src/app/models/updatePassword';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-password-profile',
  templateUrl: './update-password-profile.component.html',
  styleUrls: ['./update-password-profile.component.css']
})
export class UpdatePasswordProfileComponent implements OnInit {

  formUpdatePass: FormGroup;

  constructor(
    private uService: UserService,
    private formB: FormBuilder,
    private _router: Router
  ) {
    this.formUpdatePass = this.formB.group({
      confirmPass: ['', Validators.required],
      currentPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]]
    },{validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  updatePassword(){
    if (this.formUpdatePass.valid){
      const updatePass : UpdatePassword = { 
       password :this.formUpdatePass.value.currentPass,
        newPassword:this.formUpdatePass.value.newPass
      }
      this.uService.updateUserPassword(updatePass).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizada',
            text: 'La Contraseña se actualizo con exito!',
          }),
          this._router.navigateByUrl('/')
        },
        (error: any) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La Contraseña no se pudo actualizar!',
          })
        }
      );
    }
  }

  checkPassword(group: FormGroup) {
    const _newPass = group.get("newPass").value;
    const _confirmPass = group.get("confirmPass").value;
    if(_newPass!==_confirmPass){
      group.get("confirmPass").setErrors({notSame:true});
    }else{
      group.get("confirmPass").setErrors(null)
    }
  }

}

