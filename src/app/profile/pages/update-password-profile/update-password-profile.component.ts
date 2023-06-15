import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UpdatePassword } from 'src/app/models/updatePassword';
import { Router } from '@angular/router';
import { Alert } from 'src/app/helpers/alert';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-update-password-profile',
  templateUrl: './update-password-profile.component.html',
  styleUrls: ['./update-password-profile.component.css']
})
export class UpdatePasswordProfileComponent implements OnInit {

  formUpdatePass: FormGroup;
  IdUser:number;

  constructor(
    private uService: UserService,
    private formB: FormBuilder,
    private _router: Router,
    private _authService:AuthService
  ) {
    this.formUpdatePass = this.formB.group({
      confirmPass: ['', Validators.required],
      currentPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]]
    },{validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  getIdUser():number{
    const token = this._authService.readToken();

    const Object = this._authService.DecodeJWT(token);
    
    this.IdUser= this._authService.getValueByKey(Object,'IdUser');
    console.log(this.IdUser)
    return this.IdUser
  }

  updatePassword(){
    if (this.formUpdatePass.valid){
      const updatePass : UpdatePassword = { 
       password :this.formUpdatePass.value.currentPass,
        newPassword:this.formUpdatePass.value.newPass
      }
      this.uService.updateUserPassword(updatePass).subscribe(
        (response) => {
          Alert.mensajeExito(),
          this._router.navigateByUrl('/')
        },
        (error: any) => {
          console.log(error)
          Alert.mensajeSinExito()
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

