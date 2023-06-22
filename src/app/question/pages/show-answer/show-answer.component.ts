import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Alert } from 'src/app/helpers/alert';
import { questionAnswerDto } from 'src/app/models/Answer/QuestionAnswerDto';
import { Answer } from 'src/app/models/Answer/answer';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { ResponseDto } from 'src/app/models/response';
import { AnswerService } from 'src/app/service/answer.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-show-answer',
  templateUrl: './show-answer.component.html',
  styleUrls: ['./show-answer.component.css']
})
export class ShowAnswerComponent implements OnInit , OnChanges{

  public displayedColumns: string[] = ['description', 'file'];
  public dataSourceAnswer = new MatTableDataSource();
  listAnswer:Answer[] = [];
  myControl = new FormControl<string | Answer>('');
  filteredOptions?: Observable<Answer[]>;
  inputValue?:Answer;
  isValid:boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dataQuestion: QuestionDto,
    private answerService: AnswerService,
    private questionService :QuestionServiceService
  ) {

  }


  ngOnInit(): void {
    this.dataSourceAnswer.data = this.dataQuestion.answerEntities;
    this.answerService.GetAllAnswer().subscribe(res => {
      this.listAnswer = res.result;
    })
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.description;
        return name ? this._filter(name as string) : this.listAnswer.slice();
      })
    );
  }

  ngOnChanges(){
    this.validBtn();
  }

  private _filter(name: string): Answer[] {
    const filterValue = name.toLowerCase();

    return this.listAnswer.filter((answer) =>
    answer.description.toLowerCase().includes(filterValue)
    );
  }
  displayFn(entity: Answer): string {
    return entity && entity.description ? entity.description : '';
  }

  filterRepeated(){
    let list:Answer[] = this.dataQuestion.answerEntities;
    this.listAnswer = this.listAnswer.filter(s => !list.find(p => p.id === s.id));
  }

  validBtn(){
    this.listAnswer.find(s => s.description == this.inputValue?.description) ?
      this.isValid = true : this.isValid = false;
  }

  addSAnswerToQuestion(){
    event?.preventDefault()
    const data: questionAnswerDto = {
      idQuestion: this.dataQuestion.id, idAnswer: this.inputValue?.id,
      isCorrect: false
    }
    this.answerService.InsertInQuestion(data).subscribe({
      next: (dataResponse: ResponseDto) => {
        Alert.mensajeExitoToast('Respuesta agregada correctamente');
        //reload tab
           // Reload the table
      this.dataSourceAnswer.data = []; 
      this.questionService.GetQuestionById(this.dataQuestion.id).subscribe( res => {
        this.dataSourceAnswer.data = res.result.answerEntities;
      });

      }, error: () => Alert.mensajeSinExitoToast('ocurrio un error inesperado')
    })
  }
}
