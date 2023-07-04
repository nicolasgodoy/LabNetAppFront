import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsRequestDto } from 'src/app/models/detailsRequestDto';
import { Request } from 'src/app/models/request';
import { requiredQuestionDto } from 'src/app/models/requiredQuestionDto';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.css']
})

export class ShowRequestComponent implements OnInit {

  public formShowRequest: FormGroup;
  public notEmpty: boolean;
  public detailsRequestList: DetailsRequestDto[] = [];
  public questionList: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataQuestion: Request,
    @Inject(MAT_DIALOG_DATA) public dataRequest: Request,
    private fb: FormBuilder) {

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

    this.notEmpty = false;
    this.detailsRequestList = detailsRequestEmit;

    if (this.detailsRequestList.length > 0) {
      this.notEmpty = true;
    }
  }

  receiveQuestion(questions: number[]) {

    this.questionList = questions;
  }
}