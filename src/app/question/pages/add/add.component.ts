import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  public formQuestion: FormGroup;
  public previewImg: string;
  public files: any = [];
  public skillArr: any = [];
  public question: QuestionDto;
  public receivedQuestion: QuestionDto;

  constructor(

    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private questionService: QuestionServiceService,
    private dialogoReferencia: MatDialogRef<AddComponent>,
    private skillServices: SkillService
  ) {
    this.question = new QuestionDto();

    this.formQuestion = this.formBuilder.group({

      description: ['', [Validators.required, Validators.maxLength(120)]],
      puntuation: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      photoQuestion: [''],
      answers: this.formBuilder.array([this.formBuilder.group({ answer: [''] })])
    });
  }

  ngOnInit(): void {
  }

  get getAnswers() {

    return this.formQuestion.get('answers') as FormArray;
  }

  AddQuestion(): void {

    if (this.formQuestion.valid) {

      this.subirFormulario();
    }
  }


  addInputAnswer() {

    const controls = <FormArray>this.formQuestion.controls['answers'];
    controls.push(this.formBuilder.group({ answer: [] }));
  }


  //Para los Archivos de IMG
  captureImg(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {
        this.formQuestion.addControl('fileName', new FormControl('', [Validators.required]));
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

<<<<<<< Updated upstream
receiveModifiedQuestion(question: QuestionDto) {
  this.question.skillList = question.skillList;
  this.question.skillList.forEach(element => {
    this.question.skills.push(element.id);
    
  })
  console.log(this.question.skillList);
}
=======
  receiveModifiedQuestion(question: QuestionDto) {
    this.question.skillList = question.skillList;
    this.question.skillList.forEach(element => {
      this.question.skills.push(element.id);
    })
    console.log(this.question.skillList);
  }
>>>>>>> Stashed changes

  subirFormulario() {

    try {
      this.question.fileName = this.formQuestion.value.fileName,
        this.question.description = this.formQuestion.value.description,
        this.question.value = this.formQuestion.value.puntuation,
        this.question.file = this.files[0] // Placeholder for the image data

      console.log(this.question);

      this.questionService.AddQuestion(this.question).subscribe({
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
}