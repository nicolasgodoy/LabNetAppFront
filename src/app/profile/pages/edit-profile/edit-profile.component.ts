import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilesService } from '../../services/profiles.service';
import { profileEditDto } from 'src/app/models/Profile/profileEditDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public titulo : string = "Consultar";
  public previewImg: string;
  // public previewDoc: string;
  public modify: boolean;
  public files: any = [];
  public formulario: FormGroup;
  public profileEditDto: profileEditDto;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private servicioProfile: ProfilesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.modify = this.activatedRoute.snapshot.data['modify'];

    if (this.modify) {

      this.titulo = "Editar";

      this.formulario = this.formBuilder.group({

        name: [{ value: "", disabled: true }],
        lastName: [{ value: "", disabled: true }],
        dni: [{ value: "", disabled: true }],
        fechaNacimiento: [{ value: "", disabled: true }],
        email: [{ value: "", disabled: true }],
        description: [{ value: "", disabled: false }],
        phone: [""],
        photoProfile: [""],
        cv: [""]
      });
    }
    else {

      this.formulario = this.formBuilder.group({

        name: [{ value: "", disabled: true }],
        lastName: [{ value: "", disabled: true }],
        dni: [{ value: "", disabled: true }],
        fechaNacimiento: [{ value: "", disabled: true }],
        email: [{ value: "", disabled: true }],
        description: [{ value: "", disabled: true }],
        phone: [{ value: "", disabled: true }],
        photoProfile: [{ value: "", disabled: true }],
        cv: [{ value: "", disabled: true }]
      });
    }
  }

  editarPerfil() {

    if (this.formulario.valid) {

      this.profileEditDto.name = this.formulario.value.name;
      this.profileEditDto.lastName = this.formulario.value.lastName;
      this.profileEditDto.document = this.formulario.value.dni;
      this.profileEditDto.birthdate = this.formulario.value.fechaNacimiento;
      this.profileEditDto.email = this.formulario.value.email;
      this.profileEditDto.description = this.formulario.value.description;
      this.profileEditDto.phone = this.formulario.value.phone;
      this.profileEditDto.photo = this.formulario.value.photoProfile;
      this.profileEditDto.cv = this.formulario.value.cv;
    }

    this.servicioProfile.EditProfile(this.profileEditDto).subscribe({

      next: () => {

        this.snackBar.open('Perfil actualizado', undefined, {
          duration: 3000
        })
      },
      error: () => {

        this.snackBar.open('Formulario no valido', undefined, {
          duration: 3000
        })
      }
    })
  }

  //Para los Archivos de IMG y CV
  captureFile(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {

        this.previewImg = img.base;
        console.log(img);
      })
    this.files.push(archivoCapturado);
    console.log();
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {

    try {

      const unsafeImg = window.URL.createObjectURL($event);
      const img = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({

          base: null
        })
      }
    } catch (error) {

      return null;
    }
  })
}