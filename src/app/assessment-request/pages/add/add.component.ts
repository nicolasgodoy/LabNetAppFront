import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetailsRequestDto } from 'src/app/models/detailsRequestDto';


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
  public notEmpty: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.formAssessmentRequest = this.formBuilder.group({

      titulo: ['', [Validators.required, Validators.maxLength(120)]],
      tiempoEvaluacion: ['', [Validators.required]],
      porcentajeMinimoRequerido: [''],
      cantidadPreguntas: [''],
      skill: [''],
      difficulty: [''],
      preguntasPrimordiales: [''],
    });
  }

  ngOnInit(): void {
  }

  searchQuestion(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssessmentRequest.filter = filterValue.trim().toLocaleLowerCase();
  }

  insertAssessment() {

  } 

  receiveModifiedRequest(detailsRequestEmit: DetailsRequestDto[]) {
    this.notEmpty = false;
    this.detailsRequestList = detailsRequestEmit;

    console.log(this.detailsRequestList)
 
    if (this.detailsRequestList.length > 0){
      this.notEmpty = true;
    }
  }
}