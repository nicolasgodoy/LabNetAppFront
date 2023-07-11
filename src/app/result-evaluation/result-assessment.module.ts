import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultEvaluationsComponent } from './result-evaluations/result-evaluations.component';
import { ResultEvaluationRoutingModule } from './result-assessment.routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ResultEvaluationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ResultEvaluationRoutingModule
  ]
})
export class ResultAssessmentModule { }
