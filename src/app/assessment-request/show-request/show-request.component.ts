import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Alert } from 'src/app/helpers/alert';
import { DetailsRequestDto } from 'src/app/models/detailsRequestDto';
import { Request } from 'src/app/models/request';
import { requiredQuestionDto } from 'src/app/models/requiredQuestionDto';
import { requestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.css']
})

export class ShowRequestComponent implements OnInit {

  public formShowRequest: FormGroup;
  public detailsRequestList: DetailsRequestDto[] = [];
  public questionList: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataQuestion: Request,
    @Inject(MAT_DIALOG_DATA) public dataRequest: Request,
    public dialogRef: MatDialogRef<ShowRequestComponent>,
    private fb: FormBuilder,
    private requestService:requestService) {

    this.formShowRequest = this.fb.group({

      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      tiempoEvaluacion: ['', [Validators.required]],
      porcentajeMinimoRequerido: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.formShowRequest.patchValue({

      titulo: this.dataRequest.titleRequest,
      tiempoEvaluacion: this.dataRequest.timeInMinutes,
      porcentajeMinimoRequerido: this.dataRequest.percentageMinimoRequired,
    });
  }


  receiveDetail(detailsRequestEmit: DetailsRequestDto[]) {
    this.detailsRequestList = detailsRequestEmit;
  }

  receiveQuestion(questions: number[]) {
    this.questionList = questions;
  }


  updateRequest(){


    if (this.formShowRequest.valid) {

      const resquest : Request = {
        id: this.dataRequest.id,
        timeInMinutes: this.formShowRequest.value.tiempoEvaluacion,
        titleRequest: this.formShowRequest.value.titulo,
        percentageMinimoRequired: this.formShowRequest.value.porcentajeMinimoRequerido,
        detailRequirements: this.detailsRequestList,
        questionsRequired: this.questionList
      }

      this.requestService.UpdateRequest(resquest).subscribe({

        next:(resp)=>{
          Alert.mensajeExitoToast(resp.message);
          this.dialogRef.close(resp.isSuccess);
        },
        error:(error)=>{
          Alert.mensajeSinExitoToast();
          console.log(error);
        }
      })
    }
  }
}
