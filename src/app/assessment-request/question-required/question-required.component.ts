import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-required',
  templateUrl: './question-required.component.html',
  styleUrls: ['./question-required.component.css']
})
export class QuestionRequiredComponent implements OnInit {

  public dataSourceQuestion = new MatTableDataSource();

  public displayedColumnsQuestion: string[] = ['question'];

  constructor(
    private questionService: QuestionServiceService
  ) { }

  ngOnInit(): void {
  }

  getQuestion() {

    this.questionService.GetAllQuestion().subscribe({

      next: (resp) => {

        this.dataSourceQuestion.data = resp.result;
      },

      error: () => {

        Alert.mensajeSinExitoToast();
      }
    });
  }

  confirmDeleteQuestion(data: QuestionDto) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la pregunta : ${data.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.questionService.DeleteQuestion(data.id).subscribe({

          next: () => {

            Alert.mensajeExitoToast();
            this.getQuestion();
          },
          error: (e) => {

            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }
}