import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { requestService } from 'src/app/service/request.service';
import { Request } from 'src/app/models/request';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import Swal from 'sweetalert2';
import { Alert } from 'src/app/helpers/alert';
import { MatPaginator } from '@angular/material/paginator';
import { AddComponent } from '../add/add.component';
import { questionConsult } from 'src/app/models/Question/questionConsult';
import { ShowRequestComponent } from '../../show-request/show-request.component';


@Component({
  selector: 'app-assessment-request',
  templateUrl: './assessment-request.component.html',
  styleUrls: ['./assessment-request.component.css']
})
export class AssessmentRequestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['titleRequest', 'timeInMinutes',
    'percentageMinimoRequired', 'acciones', 'consultar', 'evaluacion'];
  public dataSourceAssesmentRequest = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private requestService: requestService) { }

  ngOnInit(): void {


    this.getRequest();
  }

  ngAfterViewInit() {

    this.dataSourceAssesmentRequest.paginator = this.paginator;
  }

  searchQuestion(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssesmentRequest.filter = filterValue.trim().toLocaleLowerCase();
  }

  getRequest() {

    this.requestService.getAllRequest().subscribe({

      next: (resp) => {
        this.dataSourceAssesmentRequest.data = resp.result;
      },

      error: (error) => {

        console.log(error);
      }
    });
  }

  dialogAddResquest(): void {

    this.dialog.open(AddComponent, {

      width: '60%',
      disableClose: true
    }).afterClosed().subscribe((resp) => {

      resp && this.getRequest();
    })
  }


  confirmDelete(dataSourceAssesmentRequest: Request) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la Request : ${dataSourceAssesmentRequest.titleRequest}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.requestService.deleteRequest(dataSourceAssesmentRequest.id).subscribe({

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

  dialogShowRequest(dataRequest: questionConsult) {

    this.dialog.open(ShowRequestComponent, {
      disableClose: false,
      data: dataRequest,
      width: '70%'
    }).afterClosed().subscribe((resp) => {

      resp && this.getRequest();

    })
  }

  showRequest(data: questionConsult) {

    this.dialogShowRequest(data);
  }
}