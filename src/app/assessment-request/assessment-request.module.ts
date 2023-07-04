import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentRequestComponent } from './pages/consult/assessment-request.component';
import { AssessmentRequestRoutingModule } from './assessment-request-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './pages/add/add.component';
import { DetailsRequestComponent } from './details-request/details-request.component';
import { QuestionRequiredComponent } from './question-required/question-required.component';
import { ShowRequestComponent } from './show-request/show-request.component';


@NgModule({
  declarations: [
    AssessmentRequestComponent,
    AddComponent,
    DetailsRequestComponent,
    QuestionRequiredComponent,
    ShowRequestComponent
  ],
  imports: [
    CommonModule,
    AssessmentRequestRoutingModule,
    SharedModule

  ]
})
export class AssessmentRequestModule { }
