import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  now: Date = new Date();
  idUser: string ='';


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
      birthdate: ['', [Validators.required, this.maxDateValidator]]
    }
    )
  }



  ngOnInit(): void {
    //TODO: RELACIONAR ESTA PAGINA CON LA PAGINA DEL USUARIO
    this.idUser = this.route.snapshot.paramMap.get('id') as string;
    
    //    if (this.id) this.obtenerObjeto(this.id);
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.profileObject.name = this.formulario.value.name;
      this.profileObject.lastName = this.formulario.value.lastname;
      this.profileObject.dni = this.formulario.value.document;
      this.profileObject.birthDate = this.formulario.value.birthdate;

      this.service.InsertProfile(this.profileObject).subscribe({
        next: () => {
          this._snackBar.open("Formulario enviado con exito!", undefined, { duration: 10000 });
          this.router.navigate(['consult-profile']);
        },
        error: () => {
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

  /*
  obtenerObjeto(id: string) {
    this.service.GetClienteById(id).subscribe(result => {
      this.clienteObject = result;
      this.cargarFormulario(); 
  */

    
}
