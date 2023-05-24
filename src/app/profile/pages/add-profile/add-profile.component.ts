import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { profileDto } from 'src/app/models/Profile/profileDto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  formulario: FormGroup;
  profileObject: profileDto = new profileDto();

  constructor(private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar, private service: ProfilesService , private route: ActivatedRoute) {

    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      document: ['', [Validators.required]],
      birthdate: ['', [Validators.required]]
    }
    )
  }

  ngOnInit(): void {
    //this.userId = this.route.snapshot.paramMap.get('id');
    //this.profileObject.email = GET de servicio usuario?;
    //this.profileObject.id = Get de servicio usuario?;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.profileObject.name = this.formulario.value.name;
      this.profileObject.lastName = this.formulario.value.lastname;
      this.profileObject.document = this.formulario.value.document;
      this.profileObject.birthdate = this.formulario.value.birthdate;

      this.service.InsertProfile(this.profileObject).subscribe(res => {
        this.openSnackBar("Formulario enviado con exito!");
      });

    }
  }
}
