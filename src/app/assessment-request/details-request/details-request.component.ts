import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { Request } from 'src/app/models/request';
import { requestService } from 'src/app/service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-request',
  templateUrl: './details-request.component.html',
  styleUrls: ['./details-request.component.css']
})
export class DetailsRequestComponent implements OnInit {

  public displayedColumns: string[] = ['skill', 'dificultad', 'cantidadPreguntas', 'acciones'];

  public dataSourceAssessmentRequest = new MatTableDataSource();
  public dataSourceQuestion = new MatTableDataSource();

  constructor(
    private requestService: requestService,
  ) { }

  ngOnInit(): void {
  }

  getRequest() {

    this.requestService.getAllRequest().subscribe({

      next: (resp) => {

        this.dataSourceAssessmentRequest.data = resp.result;
      },
      
      error: () => {

       Alert.mensajeSinExitoToast();
      }
    });
  }

  confirmDelete(data: Request) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la pregunta : ${data.titleRequest}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.requestService.deleteRequest(data.idRequest).subscribe({

          next: () => {

            Alert.mensajeExitoToast();
            this.getRequest();
          },
          error: (e) => {

            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }
}