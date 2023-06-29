import { Component, Inject, OnChanges, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Alert } from 'src/app/helpers/alert';
import { questionAnswerDto } from 'src/app/models/Answer/QuestionAnswerDto';
import { Answer } from 'src/app/models/Answer/answer';
import { questionConsult } from 'src/app/models/Question/questionConsult';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { ResponseDto } from 'src/app/models/response';
import { AnswerService } from 'src/app/service/answer.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-show-answer',
  templateUrl: './show-answer.component.html',
  styleUrls: ['./show-answer.component.css']
})
export class ShowAnswerComponent implements OnInit, OnChanges {

  public displayedColumns: string[] = ['description', 'file', 'correcta', 'acciones'];
  public dataSourceAnswer = new MatTableDataSource();
  listAnswer: Answer[] = [];
  myControl = new FormControl<string | Answer>('');
  filteredOptions?: Observable<Answer[]>;
  inputValue?: Answer;
  inList: boolean = false;
  toggleValue: boolean = false;
  showAnswer: FormGroup;
  public notEmpty: boolean;
  public questionDto: QuestionDto;
  public formQuestion: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataQuestion: questionConsult,
    private answerService: AnswerService,
    private questionService: QuestionServiceService,
    private fb: FormBuilder,
  ) {
    this.showAnswer = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(120)]],
      photoAnswer: ['']
    });
    this.formQuestion = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(120)]],
      value: ['',Validators.required]})
  }


  ngOnInit(): void {

    this.questionDto = new QuestionDto();
    this.questionDto.answers = this.dataQuestion.answerEntities;
    this.dataSourceAnswer.data = this.dataQuestion.answerEntities;
    console.log(this.dataQuestion)

    this.formQuestion.patchValue({
      description: this.dataQuestion.description,
      value: this.dataQuestion.value,
    });
  

    console.log(this.formQuestion.value.value);

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
    let list: Answer[] = this.dataQuestion.answerEntities;
    this.listAnswer = this.listAnswer.filter(s => !list.find(p => p.id === s.id));
  }

  validBtn() {
    this.listAnswer.find(s => s.description == this.inputValue?.description) ?
      this.inList = true : this.inList = false;

  }
  onSlideToggleChange(event: MatSlideToggleChange) {
    this.toggleValue = event.checked;

  }

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
    console.log(this.inList);
    event?.preventDefault();

    if (!this.inList) {
      this.subirFormulario().then((res) => {
        event?.preventDefault();
        const data: questionAnswerDto = {
          idQuestion: this.dataQuestion.id,
          idAnswer: res,
          isCorrect: this.toggleValue
        }
        this.InsertIntoQuestion(data);
      });
    }
    else {
      const data: questionAnswerDto = {
        idQuestion: this.dataQuestion.id,
        idAnswer: this.inputValue?.id,
        isCorrect: this.toggleValue
      }
      this.InsertIntoQuestion(data);
    }
  }


  InsertIntoQuestion(data: questionAnswerDto) {

    if (this.dataSourceAnswer.data.length < 4) {
      this.answerService.InsertInQuestion(data).subscribe({
        next: (dataResponse: ResponseDto) => {
          Alert.mensajeExitoToast('Respuesta agregada correctamente');
          this.dataSourceAnswer.data = [];
          this.questionService.GetQuestionById(this.dataQuestion.id).subscribe(res => {
            this.dataSourceAnswer.data = res.result.answerEntities;
          });
        },
        error: () => Alert.mensajeSinExitoToast('ocurrio un error inesperado')
      });
    } else {
      Alert.mensajeSinExitoToast("Se ha alcanzado el limite de respuestas por pregunta.");
    }

  }


  updateQuestion(){

    this.dataQuestion.value = this.formQuestion.value.value
    this.dataQuestion.description = this.formQuestion.value.description

    const FormQuestionData = new FormData();
    FormQuestionData.append('id',String(this.dataQuestion.id));
    FormQuestionData.append('value',String(this.dataQuestion.value));
    FormQuestionData.append('description',String(this.dataQuestion.description));

    this.questionService.UpdateQuestion(FormQuestionData).subscribe( {
        next: () => {
          Alert.mensajeExitoToast("Se ha guardado correctamente!");          
        },
        error: (err) => {
          Alert.mensajeSinExitoToast("No se pudo guardar!");          

        }
    })

  }

  subirFormulario() {
    return new Promise<number>((resolve, reject) => {
      try {
        const FormDatos = new FormData();
        FormDatos.append('file', null);
        FormDatos.append('fileName', null);
        FormDatos.append('description', String(this.inputValue));

        this.answerService.InsertAnswer(FormDatos).subscribe({
          next: (res) => {
            console.log(res);
            this.inList = true;
            resolve(res.result);
          },
          error: (error) => {
            console.log(error);
            reject(error);
          }
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  DeleteAnswerToQuestion(idAnswer: number) {
    this.answerService.DeleteAnswerToQuestion(idAnswer, this.dataQuestion.id).subscribe(
      {
        next: (res) => {
          Alert.mensajeExitoToast(res.message)
          this.dataSourceAnswer.data = [];
          this.questionService.GetQuestionById(this.dataQuestion.id).subscribe(res => {
            this.dataSourceAnswer.data = res.result.answerEntities;
          });

          this.answerService.GetAllAnswer().subscribe(res => {
            this.listAnswer = res.result;
          })

        },
        error: () => Alert.mensajeSinExitoToast('error al eliminar')
      }
    )
  }
}
