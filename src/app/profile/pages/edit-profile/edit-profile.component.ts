import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilesService } from '../../../service/profiles.service';
import { profileEditDto } from 'src/app/models/Profile/profileEditDto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDto } from 'src/app/Response/responseDto';
import { WorkDto } from 'src/app/models/Profile/profileWorkDto';
import { profileEducationDto } from 'src/app/models/Profile/profileEducation';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { JobPositionService } from 'src/app/service/job-position.service';
import Swal from 'sweetalert2';
import { EducationService } from 'src/app/service/education.service';
import { Alert } from 'src/app/helpers/alert';
import { DialogEducationComponent } from '../dialog-education/dialog-education.component';
import { MatDialog } from '@angular/material/dialog';
import { ConstantPool } from '@angular/compiler';
import { updateEducation } from 'src/app/models/Education/updateEducation';
import { profileFileDto } from 'src/app/models/Profile/profileFileDto';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {


  disableSelect = new FormControl(false);

  displayedColumnsWork: string[] = ['comapania', 'role'];
  displayedColumnsEducation: string[] = ['institutionName', 'degree', 'DescriptionInstitutionType',
    'admissionDate', 'expeditionDate', 'Editar', 'Eliminar'];

  dataSourceWork = new MatTableDataSource();
  dataSourceEducation = new MatTableDataSource();

  public titulo: string = "Consultar";
  public previewImg: string;
  public previewDoc: string;
  public previewName: string;
  public modify: boolean;
  public files: any = [];
  public formulario: FormGroup;
  public profileEditDto: profileEditDto = new profileEditDto();
  public idUser: number;

  public profileWork: WorkDto = new WorkDto();
  public profileEducation: profileEducationDto = new profileEducationDto();

  public listaProfileWork: any = [];
  public listaProfileEducation: any = [];
  public jobPositionArr: any = [];
  public imgProfile: string;
  public thisProfile: boolean = false;
  public IdProfile: number;
  public completeName: string;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private servicioProfile: ProfilesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private jobPositionService: JobPositionService,
    private educationService: EducationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.jobPositionService.GetAllPosition().subscribe({

      next: (res) => {

        this.jobPositionArr = res.result
      }
    })

    this.listaProfileWork.push(this.profileWork);

    this.idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.modify = this.activatedRoute.snapshot.data['modify'];

    //Para cambiar de componente
    if (this.modify) {

      this.titulo = "Editar";

      this.formulario = this.formBuilder.group({

        name: [{ value: "", disabled: true }],
        lastName: [{ value: "", disabled: true }],
        dni: [{ value: "", disabled: true }],
        fechaNacimiento: [{ value: "", disabled: true }],
        email: [{ value: "", disabled: true }],
        description: [{ value: "", disabled: false }],
        jobPosition: [{ value: "", disabled: false }],
        phone: [{ value: "", disabled: false }],
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
        jobPosition: [{ value: "", disabled: true }],
        cv: [{ value: "", disabled: true }],
        trabajo: [{ value: "", disabled: true }],
      });
    }

    //Cargar el component consultProfile con los datos
    this.getById();
  }

  getById() {
    this.servicioProfile.GetById(this.idUser).subscribe({

      next: (data: ResponseDto) => {

        this.dataSourceWork.data = data.result.workEntities;
        this.dataSourceEducation.data = data.result.educationEntities;
        this.profileEditDto = data.result;

        this.IdProfile = this.profileEditDto.idProfile;

        this.imgProfile = this.profileEditDto.photo;

        //Establecer los valores del formulario
        this.formulario.controls['name'].setValue(this.profileEditDto.name);
        this.formulario.controls['lastName'].setValue(this.profileEditDto.lastName);
        this.formulario.controls['dni'].setValue(this.profileEditDto.dni);
        this.formulario.controls['fechaNacimiento']
          .setValue(this.formatoFecha(this.profileEditDto.birthDate));
        this.formulario.controls['description'].setValue(this.profileEditDto.description);
        this.formulario.controls['phone'].setValue(this.profileEditDto.phone);
        this.formulario.controls['email'].setValue(this.profileEditDto.mail);
        this.formulario.controls['jobPosition']
          .setValue(this.profileEditDto.idJobPosition);

        this.completeName = this.profileEditDto.name + ' ' + this.profileEditDto.lastName;

      }

    });
  }

  editarPerfil() {

    if (this.formulario.valid) {

      this.profileEditDto.name = this.formulario.value.name;
      this.profileEditDto.lastName = this.formulario.value.lastName;
      this.profileEditDto.dni = this.formulario.value.dni;
      this.profileEditDto.birthDate = this.formulario.value.fechaNacimiento;
      this.profileEditDto.mail = this.formulario.value.email;
      this.profileEditDto.description = this.formulario.value.description;


      if (this.formulario.value.jobPosition != null) {
        this.profileEditDto.idJobPosition = Number(this.formulario.value.jobPosition);
      }
      else {
        this.profileEditDto.idJobPosition = 1;
      }

      this.profileEditDto.phone = String(this.formulario.value.phone);
      if (this.profileEditDto.phone === "null")
        this.profileEditDto.phone = null;

      //Fekapath problema para guardar en back
      this.profileEditDto.photo = this.formulario.value.photoProfile;

      //Fekapath problema para guardar en back
      this.profileEditDto.cv = this.formulario.value.cv;

      this.servicioProfile.EditProfile(this.profileEditDto).subscribe({

        next: () => {

          Alert.mensajeExitoToast();
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open('ocurrio un error', undefined, {
            duration: 3000
          });
          console.log(this.formulario.value.jobPosition);
        }

      });
    }
    else {

      this.snackBar.open('Formulario no valido , verifique los campos', undefined, {
        duration: 3000
      });
    }
  }

  formatoFecha(fechaConvertir: Date): string {

    const fecha = new Date(fechaConvertir);
    const formatoFinal = fecha.toISOString().split('T')[0];
    return formatoFinal;
  }

  //Para los Archivos de IMG
  captureImg(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {

        this.previewImg = img.base;
      });
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

  //NAVEGAR
  navigate() {
    if (this.modify) {
      this.router.navigateByUrl(`/profile/consult-profile/${this.idUser}`);
    }
    else this.router.navigateByUrl(`/profile/edit-profile/${this.idUser}`);
  }

  //CHECKUSER
  checkUser(): boolean {

    this.thisProfile = false;
    const token = this.auth.readToken();
    const jsonObject = this.auth.DecodeJWT(token);

    const id = this.auth.getValueByKey(jsonObject, 'IdUser');

    if (id == this.idUser)
      this.thisProfile = true;
    return this.thisProfile;
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

  subirArchivo(isImg:boolean) {
    try {
      const FormDatos = new FormData();
      FormDatos.append('id', this.idUser.toString());
      FormDatos.append('file', this.files[this.files.length - 1]);
      if (isImg){
        this.servicioProfile.UploadImage(FormDatos).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      else {
        this.servicioProfile.UploadResumee(FormDatos).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      
    }
    catch (error) {
      console.log(error)
    }
  }

}