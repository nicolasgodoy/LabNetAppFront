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
      
      const questionInsert: QuestionDto = {

        description: this.formQuestion.value.description,
        value: this.formQuestion.value.punctuation,
        idSkill: 1,
        fileName: this.formQuestion.value.fileName,
        file: this.formQuestion.value.photoQuestion
      }

      console.log(questionInsert);

      this.questionService.AddQuestion(questionInsert).subscribe({

        next: (response => {

          console.log(response.result);
        }),

        error: (error => {

          console.log(error)
      console.log(questionInsert);
        })
      })
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
}