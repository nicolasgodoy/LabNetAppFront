import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { Request } from 'src/app/models/request';
import { requiredQuestionDto } from 'src/app/models/requiredQuestionDto';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-question-required',
  templateUrl: './question-required.component.html',
  styleUrls: ['./question-required.component.css']
})
export class QuestionRequiredComponent implements OnInit {


  @Input()
  dataQuestion: Request;

  @Output()
  questionRequiredEmit: EventEmitter<number[]> = new EventEmitter<number[]>();

  public questionRequiredList: QuestionDto[] = [];
  public questionList: number[] = [];
  public questionDtoList: QuestionDto[] = [];
  public dataSourceQuestion = new MatTableDataSource();
  public formQuestionRequired: FormGroup;

  public displayedColumnsQuestion: string[] = ['question', 'acciones'];

  constructor(
    private questionService: QuestionServiceService,
    private fb: FormBuilder
  ) {

    this.formQuestionRequired = this.fb.group({
      preguntasPrimordiales: [''],
    });
  }

  ngOnInit(): void {
    console.log(this.dataQuestion)

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

  // DeleteAnswerToQuestion(idAnswer: number) {
    
  //   const index = this.dataQuestion.answers.findIndex(answer => answer.id === idAnswer);
  //   const indexInsert = this.dataQuestion.answersInsert.findIndex(answer => answer.id === idAnswer);
  //   if (index !== -1) {
  //     this.dataQuestion.answers.splice(index, 1);
  //   }
  //   if (indexInsert !== -1) {
  //     this.dataQuestion.answersInsert.splice(indexInsert, 1);
  //   }
  //   const newData: Answer[] = [...this.dataQuestion.answers.values(), ...this.dataQuestion.answersInsert.values()];

  //   this.dataSourceAnswer.data = newData;
  //   this.questionModified.emit(this.dataQuestion);

  // }

  DeleteQuestionRequired(id: number) {

    this.questionService.DeleteQuestion(id).subscribe({

      next: (resp) => {

        Alert.mensajeExitoToast(resp.message)
        // this.dataSourceQuestion.data = [];
        this.getQuestion();
      },

      error: () => {

        Alert.mensajeSinExitoToast('Error al eliminar');
      }
    });
  }
}