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


@Component({
  selector: 'app-assessment-request',
  templateUrl: './assessment-request.component.html',
  styleUrls: ['./assessment-request.component.css']
})
export class AssessmentRequestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['titleRequest','timeInMinutes',
    'percentageMinimoRequired', 'acciones'];
  public dataSourceAssesmentRequest = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private requestService: requestService) { }

  ngOnInit(): void {

    this.showRequest();
  }

  ngAfterViewInit() {

    this.dataSourceAssesmentRequest.paginator = this.paginator;
  }

  searchQuestion(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssesmentRequest.filter = filterValue.trim().toLocaleLowerCase();
  }

  showRequest() {

    this.requestService.getAllRequest().subscribe({

      next: (resp) => {

        this.dataSourceAssesmentRequest.data = resp.result;
        console.log(resp.result);
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
    }).afterClosed()
      .subscribe((resp) => {

        if (resp === 'creado') {

          this.showRequest();
        }
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

        this.requestService.deleteRequest(dataSourceAssesmentRequest.idRequest).subscribe({

          next: () => {

            Alert.mensajeExitoToast();
            this.showRequest();
          },
          error: (e) => {

            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }

  
}