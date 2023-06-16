import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './pages/add/add.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionRoutingModule } from './question-routing.module';



@NgModule({
  declarations: [
    AddComponent,
    ConsultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }