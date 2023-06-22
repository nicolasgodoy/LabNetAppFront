import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAnswerComponent } from './dialog-answer/dialog-answer.component';
import { AnswerService } from '../service/answer.service';
import { Answer } from '../models/Answer/answer';
import Swal from 'sweetalert2';
import { Alert } from '../helpers/alert';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})

export class AnswerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumnsAnswer: string[] = ['description', 'acciones', 'add'];
  public dataSourceAnswer = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.getAll();
    this.dataSourceAnswer.paginator = this.paginator;
  }

    applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAnswer.filter = filterValue.trim().toLowerCase();
  }

  openDialogAnswer(): void {

    this.dialog.open(DialogAnswerComponent, {

      width: '30%',
      disableClose: true
    }).afterClosed()
      .subscribe((resp) => {

        if (resp === 'creado') {

          this.getAll();
        }
      })
  }

  getAll() {

    this.answerService.GetAllAnswer().subscribe({

      next: (resp) => {

        this.dataSourceAnswer.data = resp.result;
        console.log(this.dataSourceAnswer.data);
        console.log(resp.result);
      },

      error: (error) => {

        console.log(error);
      }
    })
  }

  confirmDelete(answer: Answer) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la Respuesta : ${answer.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.answerService.DeleteAnswer(answer.id).subscribe({

          next: () => {

            Alert.mensajeExitoToast();
            this.getAll();
          },
          error: (e) => {

            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }
}