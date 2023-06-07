import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/models/response';
import { ProfilesService } from 'src/app/service/profiles.service';
import { DialogEducationComponent } from '../dialog-education/dialog-education.component';
import { Alert } from 'src/app/helpers/alert';
import { EducationService } from 'src/app/service/education.service';
import Swal from 'sweetalert2';
import { updateEducation } from 'src/app/models/Education/updateEducation';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css']
})
export class ProfileEducationComponent implements OnInit {

  @Input()
  idProfile?:number; 

  @Input()
  idUser?:number; 

  @Input()
  modify:boolean = true;

  listEducation: updateEducation[] =[]  ;

  displayedColumnsEducation: string[] = ['institutionName', 'degree', 'DescriptionInstitutionType',
    'admissionDate', 'expeditionDate', 'action'];

  dataSourceEducation = new MatTableDataSource();
  public listaProfileEducation: any = [];


  constructor(private profileService: ProfilesService,
    private dialog: MatDialog,
    private educationService: EducationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.GetProfileEducation(this.idProfile);
    },500) 
  }


  GetProfileEducation(id:number){

    this.profileService.GetById(id).subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          this.dataSourceEducation = dataResponse.result.educationEntities;
          this.listaProfileEducation = dataResponse.result.educationEntities;
          this.listEducation = dataResponse.result.educationEntities;

        }
      },
      error: (error) => {Alert.mensajeSinExitoToast('error al cargar educaciones');
      console.log(error);
    } 
    })
  }

  formatoFecha(fechaConvertir: Date): string {

    const fecha = new Date(fechaConvertir);
    const formatoFinal = fecha.toISOString().split('T')[0];
    return formatoFinal;
  }


  public async deleteEducation(id: number) {
    Swal.fire({
      title: 'Seguro que desea eliminar este registro?',
      text: "No podrás revertirlo más tarde!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.educationService.Delete(id).toPromise();
          this.GetProfileEducation(this.idProfile);
          Alert.mensajeExitoToast();
        } catch (error) {
          console.error(error);
          Alert.mensajeSinExitoToast();
        }
      }
    });
  }
  
  

 openDialog(idEducation?:number): void {
    let update:updateEducation ;
        
    if (idEducation) {
      update = this.listEducation.find(e => e.id === idEducation);
    }

    const dialogoref = this.dialog.open( DialogEducationComponent, {
      width: '500px',
      data: idEducation ? update : this.idProfile
    });
    dialogoref.afterClosed().subscribe(res=>{
      if (res) {
        Alert.mensajeExitoToast(res),
        this.GetProfileEducation(this.idProfile)
      }
    })
    
  }
}
