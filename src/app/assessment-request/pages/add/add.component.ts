import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { Request } from 'src/app/models/request';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { requestService } from 'src/app/service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public formAssessmentRequest: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['skill', 'dificultad', 'cantidadPreguntas', 'acciones'];
  public displayedColumnsQuestion: string[] = ['question'];

  public dataSourceAssessmentRequest = new MatTableDataSource();
  public dataSourceQuestion = new MatTableDataSource();

  constructor(
    private formBuilder: FormBuilder,
    private requestService: requestService,
    private questionService: QuestionServiceService
  ) {

    this.formAssessmentRequest = this.formBuilder.group({

      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      tiempoEvaluacion: ['', [Validators.required]],
      porcentajeMinimoRequerido: [''],
      skill: [''],
      difficulty: [''],
      cantidadPreguntas: ['']

    });
  }

  ngOnInit(): void {
  }

  searchQuestion(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssessmentRequest.filter = filterValue.trim().toLocaleLowerCase();
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