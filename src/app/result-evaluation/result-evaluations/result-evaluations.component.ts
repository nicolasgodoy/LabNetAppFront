import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/Response/responseDto';
import { ConsultAssessmentDto } from 'src/app/models/Evaluation/consultAssessmentQuestionDto';
import { AssessmentQuestion } from 'src/app/models/Question/assessmentQuestion';
import { AuthService } from 'src/app/service/auth.service';
import { AssessmentService } from 'src/app/service/evaluation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result-evaluations',
  templateUrl: './result-evaluations.component.html',
  styleUrls: ['./result-evaluations.component.css']
})
export class ResultEvaluationsComponent implements OnInit {
  dataSourceAssessment = new MatTableDataSource();
  displayedColumns: string[] = ['nombreUser','Dni','Titulo','PuntosObtenidos','FechaEvaluacion'];
  listConsultAssessment: ConsultAssessmentDto[] = [];
  IdUser:number
  IdRol:number
  
  constructor(private evaluationService: AssessmentService,
              private _authService: AuthService) { }

  ngOnInit(): void {
    const token = this._authService.readToken();

    const Object = this._authService.DecodeJWT(token);
    
    this.IdUser = this._authService.getValueByKey(Object,'IdUser');
    this.IdRol = this._authService.getValueByKey(Object,'IdRol');

    this.getallAssessment();
  }

 

  getallAssessment() {
    
    this.evaluationService.GetAllAssessment().subscribe({
      next: (dataResponse: ResponseDto) => {
        
        this.dataSourceAssessment.data = dataResponse.result.IdRol
        this.dataSourceAssessment.data = dataResponse.result.IdUser
        this.dataSourceAssessment.data = dataResponse.result as ConsultAssessmentDto[];
        this.listConsultAssessment = dataResponse.result;

        console.log(this.IdRol)
        console.log(this.IdUser)

        
        console.log(dataResponse.result)
      },
      error: (e) => {
        console.log('ocurrio un error inesperado');
        
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssessment.filter = filterValue.trim().toLowerCase();
  }

  

  

}
