import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { DetailsRequestDto } from 'src/app/models/detailsRequestDto';
import { Request } from 'src/app/models/request';
import { requiredQuestionDto } from 'src/app/models/requiredQuestionDto';
import { requestService } from 'src/app/service/request.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  public formAssessmentRequest: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSourceAssessmentRequest = new MatTableDataSource();
  public dataSourceQuestion = new MatTableDataSource();
  public detailsRequestList: DetailsRequestDto[] = [];
  public questionList: number[] = [];
  public notEmpty: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: requestService,
    private dialogRef: MatDialogRef<AddComponent>
  ) {

    this.formAssessmentRequest = this.formBuilder.group({

      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      tiempoEvaluacion: ['', [Validators.required]],
      porcentajeMinimoRequerido: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  searchQuestion(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssessmentRequest.filter = filterValue.trim().toLocaleLowerCase();
  }

  receiveDetail(detailsRequestEmit: DetailsRequestDto[]) {
    this.notEmpty = false;
    this.detailsRequestList = detailsRequestEmit;

    if (this.detailsRequestList.length > 0){
      this.notEmpty = true;
    }
  }

  receiveQuestion(questions: number[]) {
    this.questionList = questions;
  }

  addRequest(){

    if (this.formAssessmentRequest.valid) {

      const resquest : Request = {
        idRequest: 0,
        timeInMinutes: this.formAssessmentRequest.value.tiempoEvaluacion,
        titleRequest: this.formAssessmentRequest.value.titulo,
        percentageMinimoRequired: this.formAssessmentRequest.value.porcentajeMinimoRequerido,
        detailRequirements: this.detailsRequestList,
        requiredQuestions: this.questionList
      }

      this.requestService.addRequest(resquest).subscribe({

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