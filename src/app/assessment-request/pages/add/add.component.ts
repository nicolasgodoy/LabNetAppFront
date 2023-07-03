import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public formAssessmentRequest: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['skill','dificultad', 'cantidadPreguntas'];
  public dataSourceAssessmentRequest = new MatTableDataSource()
  constructor(
    private formBuilder: FormBuilder,
    ) 
    {

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

  /* confirmDelete(dataQuestion: QuestionDto) {

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
   */
}


