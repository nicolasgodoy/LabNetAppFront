import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentRequestComponent } from './pages/consult/assessment-request.component';
import { AssessmentRequestRoutingModule } from './assessment-request-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './pages/add/add.component';


@NgModule({
  declarations: [
    AssessmentRequestComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    AssessmentRequestRoutingModule,
    SharedModule

  ]
})
export class AssessmentRequestModule { }
