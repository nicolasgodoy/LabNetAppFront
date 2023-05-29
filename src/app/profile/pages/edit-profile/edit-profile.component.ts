import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilesService } from '../../services/profiles.service';
import { profileEditDto } from 'src/app/models/Profile/profileEditDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data } from '@angular/router';
import { ResponseDto } from 'src/app/Response/responseDto';
import { WorkDto } from 'src/app/models/Profile/profileWorkDto';
import { profileEducationDto } from 'src/app/models/Profile/profileEducation';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {

  displayedColumns: string[] = ['comapania', 'role'];
  displayedColumnsEducation: string[] = ['institutionName', 'degree' , 
  'admissionDate', 'expeditionDate'];

  dataSource = new MatTableDataSource();
  dataSourceEducation = new MatTableDataSource();

  public titulo : string = "Consultar";
  public previewImg: string;
  public previewDoc: string;
  public previewName : string;
  public modify: boolean;
  public files: any = [];
  public formulario: FormGroup;
  public profileEditDto: profileEditDto = new profileEditDto();
  public idUser : number;
  public profileWork: WorkDto = new WorkDto();
  public profileEducation: profileEducationDto = new profileEducationDto();
  public listaProfileWork: any = [];
  public listaProfileEducation: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private servicioProfile: ProfilesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {

    this.listaProfileWork.push(this.profileWork);

    this.idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));

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
        cv: [{ value: "", disabled: true }],
        trabajo: [{ value: "", disabled: true }],
        photo: [{ value: "", disabled: true }]
      });
    }

    this.servicioProfile.GetById(this.idUser).subscribe({

      next: (data : ResponseDto) =>{

        this.dataSource.data = data.result.workEntities;
        this.dataSourceEducation.data = data.result.educationEntities;

        this.profileEditDto = data.result;

        this.listaProfileWork = this.profileEditDto.workEntities;
        this.listaProfileEducation = this.profileEditDto.educationEntities;

        this.formulario.controls['name'].setValue(this.profileEditDto.name);
        this.formulario.controls['photo'].setValue(this.profileEditDto.name);
        this.formulario.controls['lastName'].setValue(this.profileEditDto.lastName);
        this.formulario.controls['dni'].setValue(this.profileEditDto.dni);
        this.formulario.controls['fechaNacimiento']
        .setValue(this.formatoFecha(this.profileEditDto.birthDate));
        this.formulario.controls['description'].setValue(this.profileEditDto.description);
        this.formulario.controls['phone'].setValue(this.profileEditDto.phone);
        this.formulario.controls['email'].setValue(this.profileEditDto.mail);

        // this.formulario.controls['trabajo'].setValue(this.listaProfileEducation);
        // this.formulario.controls['cv'].setValue(this.profileEditDto.cv);
      }
    });
  }

  formatoFecha (fechaConvertir: Date): string {

    const fecha = new Date(fechaConvertir);
    const formatoFinal = fecha.toISOString().split('T')[0];
    return formatoFinal;
  }

  editarPerfil() {

    if (this.formulario.valid) {

      this.profileEditDto.name = this.formulario.value.name;
      this.profileEditDto.lastName = this.formulario.value.lastName;
      this.profileEditDto.dni = this.formulario.value.dni;
      this.profileEditDto.birthDate = this.formulario.value.fechaNacimiento;
      this.profileEditDto.mail = this.formulario.value.email;
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

  //Para los Archivos de IMG
  captureImg(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {

        this.previewImg = img.base;
        console.log(img);
      })
    this.files.push(archivoCapturado);
    console.log();
  }

  //CV
  captureFile(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {

       this.previewDoc = img.base;
       this.previewName = archivoCapturado.name;
      });
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