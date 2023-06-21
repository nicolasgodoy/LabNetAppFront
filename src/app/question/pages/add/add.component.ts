import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  public formQuestion: FormGroup;
  public previewImg: string;
  public files: any = [];

  constructor(

    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private questionService: QuestionServiceService
  ) {

    this.formQuestion = this.formBuilder.group({

      description: ['', [Validators.required, Validators.maxLength(120)]],
      punctuation: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fileName: [''],
      photoQuestion: ['']
    });
  }

  ngOnInit(): void {
  }

  AddQuestion(): void {

    if (this.formQuestion.valid) {

      this.subirFormulario();
    }
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

  subirFormulario() {
    try {
      const FormDatos = new FormData();
      FormDatos.append('file', this.files[0]);
      FormDatos.append('fileName', this.formQuestion.value.fileName);
      FormDatos.append('idSkill', '1');
      FormDatos.append('description', this.formQuestion.value.description);
      FormDatos.append('value', this.formQuestion.value.punctuation);

      this.questionService.AddQuestion(FormDatos).subscribe({
        next: (res) => {
          console.log(res);
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