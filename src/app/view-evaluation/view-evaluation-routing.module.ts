import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'consult/:id', component: EvaluationComponent},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
  
})
export class EvaluationRoutingModule { }