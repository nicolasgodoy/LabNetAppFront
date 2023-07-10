import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { Request, RequestDto } from 'src/app/models/request';
import { requiredQuestionDto } from 'src/app/models/requiredQuestionDto';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { requestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-question-required',
  templateUrl: './question-required.component.html',
  styleUrls: ['./question-required.component.css']
})
export class QuestionRequiredComponent implements OnInit {


  @Input()
  dataQuestion: RequestDto;

  @Output()
  questionRequiredEmit: EventEmitter<number[]> = new EventEmitter<number[]>();

  public questionRequiredList: QuestionDto[] = [];
  public questionList: number[] = [];
  public questionDtoList: QuestionDto[] = [];
  public dataSourceQuestion = new MatTableDataSource();
  public formQuestionRequired: FormGroup;
  public idRequest: number;

  public displayedColumnsQuestion: string[] = ['question', 'acciones'];

  constructor(
    private questionService: QuestionServiceService,
    private requestService: requestService,
    private fb: FormBuilder
  ) {

    this.formQuestionRequired = this.fb.group({
      preguntasPrimordiales: [''],
    });
  }

  ngOnInit(): void {

    this.questionDtoList = this.dataQuestion.questionsRequired;
    this.idRequest = this.dataQuestion.id;
    this.dataSourceQuestion.data = this.dataQuestion.questionsRequired;

    this.questionService.GetAllQuestion().subscribe({

      next: (resp) => {
        this.questionRequiredList = resp.result;
      }
    });
  }

  getQuestionRequired() {
    this.questionService.GetAllQuestion().subscribe({

      next: (resp) => {
        this.questionRequiredList = resp.result;
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

  addDetails() {

    event?.preventDefault();

    this.questionList.push(this.formQuestionRequired.value.preguntasPrimordiales.id);
    this.questionDtoList.push(this.formQuestionRequired.value.preguntasPrimordiales);

    this.questionRequiredEmit.emit(this.questionList);
    this.dataSourceQuestion.data = this.questionDtoList;


    this.formQuestionRequired.reset();
  }

  
  DeleteQuestionRequired(idQuestion: number) {

    this.requestService.deleteToQuestionRequired(this.idRequest, idQuestion).subscribe({

      next: (resp) => {

        Alert.mensajeExitoToast(resp.message)
        console.log(resp.message);
        // this.dataSourceQuestion.data = [];
        this.getQuestionRequired();
      },

      error: () => {

        Alert.mensajeSinExitoToast('Error al eliminar');
      }
    });
  }
}