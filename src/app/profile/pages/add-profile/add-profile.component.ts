import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { profileDto } from 'src/app/models/Profile/profileDto';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  formulario: FormGroup;
  profileObject: profileDto = new profileDto();
  //userObject: userDto = new UserDto();

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: ProfilesService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      document: ['', [Validators.required]],
      birthdate: ['', [Validators.required]]
    }
    )
  }

  ngOnInit(): void {
    
    //TODO: RELACIONAR ESTA PAGINA CON LA PAGINA DEL USUARIO

    //this.user = getById(aca tendria que ir un token/id?)

    //this.profileObject.email = this.user.email
    //this.profileObject.idUser = this.user.id;

    //this.userId = this.route.snapshot.paramMap.get('id');
    //this.profileObject.email = GET de servicio usuario?;
    //this.profileObject.idUser = Get de servicio usuario?;

  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.profileObject.name = this.formulario.value.name;
      this.profileObject.lastName = this.formulario.value.lastname;
      this.profileObject.document = this.formulario.value.document;
      this.profileObject.birthdate = this.formulario.value.birthdate;

      this.service.InsertProfile(this.profileObject).subscribe({
        next: () => {
          this._snackBar.open("Formulario enviado con exito!", undefined, { duration: 30000 });
          this.router.navigate(['consult-profile']);
        },
        error: () => {
          this._snackBar.open("No se pudo enviar el formulario, intentelo de nuevo mas tarde.",
            undefined, { duration: 30000 });
        }
      });
    }
  }
}
