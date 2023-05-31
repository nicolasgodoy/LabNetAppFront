import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfilesService } from 'src/app/service/profiles.service';
import { profileDto } from 'src/app/models/Profile/profileDto';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  formulario: FormGroup;
  profileObject: profileDto = new profileDto();
  now: Date = new Date();
  idUser: number;
  userObject: User;


  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private auth : AuthService
  ) {

    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      document: ['', [Validators.required]],
      birthdate: ['', [Validators.required, this.maxDateValidator]]
    }
    )
  }



  ngOnInit(): void {
    this.idUser = Number(this.route.snapshot.paramMap.get('id'));
    const tokenDummy = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ';
    const decodedJSON = this.auth.DecodeJWT(tokenDummy);
    const propertiesArray = Object.values(decodedJSON);

    //TEST LOGS
    console.log(decodedJSON);
    console.log(propertiesArray);

    const email = this.getValueByKey(decodedJSON, 'admin');
    console.log(email);

  }

  onSubmit(): void {

    if (this.formulario.valid) {

      console.log(this.idUser);

      this.profileObject.idUser = this.idUser;
      this.profileObject.name = this.formulario.value.name;
      this.profileObject.lastName = this.formulario.value.lastname;
      this.profileObject.dni = this.formulario.value.document;
      this.profileObject.birthDate = this.formulario.value.birthdate;
      this.profileObject.mail = "example@mail.com" //DUMMY E-MAIL



      this.service.InsertProfile(this.profileObject).subscribe({
        next: () => {
          this._snackBar.open("Formulario enviado con exito!", undefined, { duration: 10000 });
          this.router.navigate(['consult-profile/'+this.idUser]);
        },
        error: (error) => {
          console.log(error); 
          this._snackBar.open("No se pudo enviar el formulario, intentelo de nuevo mas tarde.",
            undefined, { duration: 30000 });
        }
      });
    }
  }

  // Validator custom para maxima fecha
  maxDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const now = new Date();
    
    if (selectedDate > now) {
      return { maxDate: true };
    }
    return null;
  }


   getValueByKey = (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      return obj[key];
    }
    return null;
  };
}
