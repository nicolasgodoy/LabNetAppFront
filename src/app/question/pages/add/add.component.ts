import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { Difficulty } from 'src/app/models/difficulty';
import { DifficultyService } from 'src/app/service/difficulty.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  public formQuestion: FormGroup;
  public previewImg: string;
  public difficultyList: Difficulty[];
  public files: any = [];
  public skillArr: any = [];
  public question: QuestionDto;
  public receivedQuestion: QuestionDto;
  public maxAnswer: boolean = false;
  public toggleValue: boolean = false;
  public toggleValueQuestion: boolean = false;
  public toggleValueAnswer: boolean = false;
  public correcto: string;
  public incorrecto: string;
  public textoClaseQuestion: string;
  public imagenClaseQuestion: string;
  public textoClaseAnswer: string;
  public imagenClaseAnswer: string;
  public notEmpty: boolean;

  constructor(

    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private questionService: QuestionServiceService,
    private difficultyService: DifficultyService,
    private dialogoReferencia: MatDialogRef<AddComponent>) {
    this.question = new QuestionDto();

    this.formQuestion = this.formBuilder.group({

      description: ['', [Validators.required, Validators.maxLength(120)]],
      difficulty: ['', [Validators.required]],
      photoQuestion: [''],
    });
  }

  ngOnInit(): void {
    this.getDifficulty();
  }

  AddQuestion(): void {

    if (this.formQuestion.valid) {

      this.subirFormulario();
    }
  }

  onSlideToggleChange(event: MatSlideToggleChange) {

    this.toggleValue = event.checked;
    this.correcto = this.toggleValue ? 'texto-correcto' : 'texto-activo';
    this.incorrecto = this.toggleValue ? 'texto-activo' : 'texto-correcto';
  }

  onSlideToggleChangeQuestion(event: MatSlideToggleChange) {

    this.toggleValueQuestion = event.checked;
    this.textoClaseQuestion = this.toggleValueQuestion ? 'texto-activo' : 'texto-inactivo';
    this.imagenClaseQuestion = this.toggleValueQuestion ? 'texto-inactivo' : 'texto-activo';
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
      const img = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
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

  receiveModifiedQuestion(question: QuestionDto) {
    this.notEmpty = false;
    this.question.skillList = question.skillList;
    this.question.answers = question.answers;
    this.question.answersInsert = question.answersInsert;
    this.question.skills = this.question.skillList.map(element => element.id);

    if (this.question.answers.length>0 || this.question.answersInsert.length>0){
      this.notEmpty = true;
    }
  }

  subirFormulario() {

    try {
      const FormDatos = new FormData();
      FormDatos.append('file', this.files[0]);
      FormDatos.append('description', this.formQuestion.value.description);
      FormDatos.append('idDifficulty', this.formQuestion.value.difficulty);
      console.log(this.formQuestion.value.difficulty);


      //Having answers
      for (let i = 0; i < this.question.answers.length; i++) {
        const keyPrefix = `answers[${i}].`;
        FormDatos.append(keyPrefix + "IdAnswer", this.question.answers[i].id.toString());
        FormDatos.append(keyPrefix + "Description", this.question.answers[i].description);
        FormDatos.append(keyPrefix + "IsCorrect", this.question.answers[i].isCorrect.toString());
        console.log(this.question.answers[i].file)

        if (this.question.answers[i].file != undefined )
          FormDatos.append(keyPrefix + "File", this.question.answers[i].file);
        else FormDatos.append(keyPrefix + "File", null);
      }

      //Inserting Answers
      for (let i = 0; i < this.question.answersInsert.length; i++) {
        const keyPrefix = `answersInsert[${i}].`;
        FormDatos.append(keyPrefix + "IdAnswer", '0');
        FormDatos.append(keyPrefix + "Description", this.question.answersInsert[i].description);
        FormDatos.append(keyPrefix + "IsCorrect", this.question.answersInsert[i].isCorrect.toString());

        if (this.question.answersInsert[i].file != undefined )
          FormDatos.append(keyPrefix + "File", this.question.answersInsert[i].file);
        else FormDatos.append(keyPrefix + "File", null);      }

      //Skills
      for (let i = 0; i < this.question.skills.length; i++) {
        const key = `skills[${i}]`;
        FormDatos.append(key, this.question.skills[i].toString());
      }

      console.log(FormDatos)
      this.questionService.AddQuestion(FormDatos).subscribe({
        next: (res) => {
          console.log(res);
          this.dialogoReferencia.close('creado');
          Alert.mensajeExitoToast();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    catch (error) {
      console.log(error)
    }
  }


  getDifficulty():void{

    this.difficultyService.getAllDifficulty().subscribe({

      next:(response)=>{
        this.difficultyList = response.result;
      }

    })
  }
}