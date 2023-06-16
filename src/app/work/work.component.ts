import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModifyWorkDto } from '../models/Work/ModifyWorkDto';
import { DialogWorkComponent } from '../profile/pages/dialog-work/dialog-work.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { WorkService } from '../service/work.service';
import { ResponseDto } from '../Response/responseDto';
import { ProfilesService } from '../service/profiles.service';
import { Alert } from '../helpers/alert';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  @Input()
  idUser: number;
  @Input()
  idProfile: number;
  @Input()
  modify: boolean = true;

  dataSourceWork = new MatTableDataSource();

  displayedColumnsWork: string[] = ['compania', 'role','position', 'ubicacion', 'tipoTrabajo', 'sector','admissionDate'  , 'expeditionDate'
  , 'add'];
  constructor(
    public dialog: MatDialog,
    private workService: WorkService,
    private servicioProfile: ProfilesService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {

      this.GetWork(this.idUser);
    }, 500)
  }

  GetWork(id: number) {
    this.servicioProfile.GetById(id).subscribe({
      next: (dataResponse: ResponseDto) => {

        if (dataResponse.isSuccess) {
          this.dataSourceWork = dataResponse.result.workEntities;
        }
      },
      error: () => Alert.mensajeSinExitoToast('error al cargar skills')
    })
  }

  openDialogWork(): void {

    const dialog = this.dialog.open(DialogWorkComponent, {
      data : this.idProfile,
      width: '500px'
    },);

    dialog.afterClosed().subscribe(res => {

      res && this.GetWork(this.idUser);
    })
  }

  openDialogWorkUpdate(modifyWorkDto: ModifyWorkDto): void {

    const dialog = this.dialog.open(DialogWorkComponent, {
      width: '500px',
      data: modifyWorkDto
    });

    dialog.afterClosed().subscribe(res => {

      res && this.GetWork(this.idProfile)
    })
  }

  public deleteWork(id: number) {

    Swal.fire({

      title: '¿Seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Sí, eliminalo!'
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {
          await this.workService.DeleteWork(id).toPromise();

          const respuesta: ResponseDto = await this.servicioProfile.GetById(this.idProfile)
            .toPromise();
          this.dataSourceWork.data = respuesta.result.workEntities;
          this.GetWork(this.idProfile);
          Alert.mensajeExitoToast();

        } catch (error) {

          console.error(error);
          Alert.mensajeSinExitoToast();
        }
      }
    })
  }

  formatoFecha(fechaConvertir: Date): string {

    const fecha = new Date(fechaConvertir);
    const formatoFinal = fecha.toISOString().split('T')[0];
    return formatoFinal;
  }
}