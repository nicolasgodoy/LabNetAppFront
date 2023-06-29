import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import Swal from 'sweetalert2';
import { Alert } from 'src/app/helpers/alert';
import { MatPaginator } from '@angular/material/paginator';
import { ShowAnswerComponent } from '../show-answer/show-answer.component';
import { questionConsult } from 'src/app/models/Question/questionConsult';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})

export class ConsultComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['description', 'value',
    'image', 'acciones', 'consultar'];
  public dataSourceQuestion = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private questionService: QuestionServiceService) { }

  ngOnInit(): void {

    this.showQuestion();
  }

  ngAfterViewInit() {

    this.dataSourceQuestion.paginator = this.paginator;
  }

  searchQuestion(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceQuestion.filter = filterValue.trim().toLocaleLowerCase();
  }

  showQuestion() {

    this.questionService.GetAllQuestion().subscribe({

      next: (resp) => {

        this.dataSourceQuestion.data = resp.result;
      },

      error: (error) => {

        console.log(error);
      }
    });
  }

  dialogAddQuestion(): void {

    this.dialog.open(AddComponent, {

      width: '60%',
      disableClose: false
    }).afterClosed()
      .subscribe((resp) => {

        if (resp === 'creado') {

          this.showQuestion();
        }
      })
  }


  confirmDelete(dataQuestion: QuestionDto) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la pregunta : ${dataQuestion.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.questionService.DeleteQuestion(dataQuestion.id).subscribe({

          next: () => {

            Alert.mensajeExitoToast();
            this.showQuestion();
          },
          error: (e) => {

            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }

  //show answers
  dialogShowAnswer(dataQuestion: questionConsult) {

    this.dialog
      .open(ShowAnswerComponent, {
        disableClose: false,
        width: '70%',
        data: dataQuestion
      })
      .afterClosed()
      .subscribe(() => {
        this.showQuestion();
      });
  }
  
  showAnswers(dataQuestion: questionConsult) {
    this.dialogShowAnswer(dataQuestion);
  }
}