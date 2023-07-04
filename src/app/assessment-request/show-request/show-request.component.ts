import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsRequestDto } from 'src/app/models/detailsRequestDto';

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

  constructor(private fb: FormBuilder) {

    this.formShowRequest = this.fb.group({

      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      tiempoEvaluacion: ['', [Validators.required]],
      porcentajeMinimoRequerido: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
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
