import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Alert } from 'src/app/helpers/alert';
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

  constructor(

    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private questionService: QuestionServiceService,
    private dialogoReferencia: MatDialogRef<AddComponent>,
    private skillServices: SkillService
  ) {

    this.formQuestion = this.formBuilder.group({

      description: ['', [Validators.required, Validators.maxLength(120)]],
      puntuation: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      skill: ['',[Validators.required]],
      photoQuestion: ['']
    });
  }

  ngOnInit(): void {

    this.GetSkill();
  }


  AddQuestion(): void {

    if (this.formQuestion.valid) {

      this.subirFormulario();
    }
  }

  GetSkill(): void {

    this.skillServices.getSkill().subscribe({

      next: (resp => {

        this.skillArr = resp.result;
      }),

      error: (error) => {

        console.log(error);
      }
    })
  }

  //Para los Archivos de IMG
  captureImg(event: any): any {

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
      .then((img: any) => {
        this.formQuestion.addControl('fileName',new FormControl('',[Validators.required]));
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
      FormDatos.append('idSkill', this.formQuestion.value.skill);
      FormDatos.append('description', this.formQuestion.value.description);
      FormDatos.append('value', this.formQuestion.value.puntuation);
      FormDatos.append('photoQuestion', this.formQuestion.value.photoQuestion)

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
}