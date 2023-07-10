import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Alert } from 'src/app/helpers/alert';
import { questionAnswerDto } from 'src/app/models/Answer/QuestionAnswerDto';
import { addAnswer } from 'src/app/models/Answer/addAnswer';
import { Answer } from 'src/app/models/Answer/answer';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { ResponseDto } from 'src/app/models/response';
import { AnswerService } from 'src/app/service/answer.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-answer-in-question',
  templateUrl: './answer-in-question.component.html',
  styleUrls: ['./answer-in-question.component.css']
})
export class AnswerInQuestionComponent implements OnInit, OnChanges {

  @Input()
  dataQuestion: QuestionDto

  @Output()
  questionModified: EventEmitter<QuestionDto> = new EventEmitter<QuestionDto>();

  public displayedColumns: string[] = ['description', 'file', 'correcta', 'acciones'];
  public dataSourceAnswer = new MatTableDataSource();
  listAnswer: Answer[] = [];
  myControl = new FormControl<string | Answer>('');
  filteredOptions?: Observable<Answer[]>;
  inputValue?: Answer;
  inList: boolean = false;
  toggleValue: boolean = false;
  showAnswer: FormGroup;
  public textoClaseAnswer: string;
  public imagenClaseAnswer: string;
  public toggleValueAnswer: boolean = false;
  public files: any[] = [];
  public previewImg: string;

  constructor(
    private answerService: AnswerService,
    private fb: FormBuilder
  ) {
    this.showAnswer = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(120)]],
      photoAnswer: ['']
    });
  }


  ngOnInit(): void {
    this.dataQuestion.answers = [];
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

  ngOnChanges() {
    this.validBtn();
    this.questionModified.emit(this.dataQuestion);
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

  filterRepeated() {
    let list: Answer[] = this.dataQuestion.answers;
    this.listAnswer = this.listAnswer.filter(s => !list.find(p => p.id === s.id));
  }

  validBtn() {
    this.listAnswer.find(s => s.description == this.inputValue?.description) ?
      this.inList = true : this.inList = false;

  }
  onSlideToggleChange(event: MatSlideToggleChange) {
    this.toggleValue = event.checked;

  }

  onSlideToggleChangeAnswer(event: MatSlideToggleChange) {

    this.toggleValueAnswer = event.checked;
    this.textoClaseAnswer = this.toggleValueAnswer ? 'texto-activo' : 'texto-inactivo';
    this.imagenClaseAnswer = this.toggleValueAnswer ? 'texto-inactivo' : 'texto-activo';
  }

  //Para los Archivos de IMG
  captureImg(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {
        this.previewImg = img.base;
      });
    this.files.push(archivoCapturado);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {

    try {

      const unsafeImg = window.URL.createObjectURL($event);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    } catch (error) {

      return null;
    }
  })



  getAll() {

    this.answerService.GetAllAnswer().subscribe({

      next: (resp) => {

        this.dataSourceAnswer.data = resp.result;
      },

      error: (error) => {

        console.log(error);
      }
    })
  }

  addSAnswerToQuestion() {

    event?.preventDefault();

    if (this.inList) {
      event?.preventDefault();

      const selectedOption = this.myControl.value;
      if (selectedOption) {

        this.answerService.GetById(this.inputValue.id).subscribe(result => {
          result.result.isCorrect = this.toggleValue;
          this.dataQuestion.answers.push(result.result);
          const newData: Answer[] = [...this.dataQuestion.answers.values(), ...this.dataQuestion.answersInsert.values()];

          this.dataSourceAnswer.data = newData;
          this.questionModified.emit(this.dataQuestion);
        });
      }
    } else {

      const newAnswer: Answer = {
        description: String(this.myControl.value),
        file: this.files[0],
        isCorrect: this.toggleValue,
        id: 0
      }

      this.dataQuestion.answersInsert.push(newAnswer);

      const newData: Answer[] = [...this.dataQuestion.answers.values(), ...this.dataQuestion.answersInsert.values()];
      this.dataSourceAnswer.data = newData;
      this.questionModified.emit(this.dataQuestion);
    }

    this.myControl.reset();
    this.files = [];
    this.previewImg = null;
  }

  DeleteAnswerToQuestion(idAnswer: number) {
    
    const index = this.dataQuestion.answers.findIndex(answer => answer.id === idAnswer);
    const indexInsert = this.dataQuestion.answersInsert.findIndex(answer => answer.id === idAnswer);
    if (index !== -1) {
      this.dataQuestion.answers.splice(index, 1);
    }
    if (indexInsert !== -1) {
      this.dataQuestion.answersInsert.splice(indexInsert, 1);
    }
    const newData: Answer[] = [...this.dataQuestion.answers.values(), ...this.dataQuestion.answersInsert.values()];

    this.dataSourceAnswer.data = newData;
    this.questionModified.emit(this.dataQuestion);

  }

}