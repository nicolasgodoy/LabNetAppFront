import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/Response/responseDto';
import { AssessmentUserDto } from 'src/app/models/Evaluation/assessmentUserDto';
import { AssessmentService } from 'src/app/service/evaluation.service';

@Component({
  selector: 'app-result-evaluations',
  templateUrl: './result-evaluations.component.html',
  styleUrls: ['./result-evaluations.component.css']
})
export class ResultEvaluationsComponent implements OnInit {
  dataSource = new MatTableDataSource<AssessmentUserDto>();

  constructor(private evaluationService: AssessmentService,) { }

  ngOnInit(): void {
  }



  getallAssessment() {
    
    this.evaluationService.GetAllAssessment().subscribe({
      next: (dataResponse: ResponseDto) => {
        
        this.dataSource.data = dataResponse.result;
      },
      error: (e) => {
        console.log('ocurrio un error inesperado');
        
      },
    });
  }

}
