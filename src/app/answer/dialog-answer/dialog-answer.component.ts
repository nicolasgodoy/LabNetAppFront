import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AnswerService } from 'src/app/service/answer.service';

@Component({
  selector: 'app-dialog-answer',
  templateUrl: './dialog-answer.component.html',
  styleUrls: ['./dialog-answer.component.css']
})

export class DialogAnswerComponent implements OnInit {

  public formAnswer: FormGroup;
  public valores: string[] = ['Correcta'];
  public previewImg: string;
  public files: any = [];

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private answerService: AnswerService,
    private dialogoReferencia: MatDialogRef<DialogAnswerComponent>,
  ) {

    this.formAnswer = this.fb.group({

      description: ['',[Validators.required, Validators.maxLength(120)]],
      fileName: [''],
      photoAnswer: ['']
    })
   }

  ngOnInit(): void {
  }

  //Servicio add Answer
  AddAnswer() {

    if(this.formAnswer.valid) {

      this.subirFormulario();
    }
  }

  subirFormulario() {
    
    try {
      const FormDatos = new FormData();
      FormDatos.append('file', this.files[0]);
      FormDatos.append('fileName', this.formAnswer.value.fileName);
      FormDatos.append('idSkill', '1');
      FormDatos.append('description', this.formAnswer.value.description);

      this.answerService.InsertAnswer(FormDatos).subscribe({
        next: (res) => {
          console.log(res);
          this.dialogoReferencia.close('creado');
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