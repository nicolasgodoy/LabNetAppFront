import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EvaluationRoutingModule } from './view-evaluation-routing.module';


@NgModule({
  declarations: [
    EvaluationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    EvaluationRoutingModule
  ]
})
export class ViewEvaluationModule { }
