import { NgModule } from '@angular/core';
import { ConsultComponent } from '../skill/pages/consult/consult.component';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentRequestComponent } from './pages/consult/assessment-request.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'consult', component: AssessmentRequestComponent},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
  
})
export class AssessmentRequestRoutingModule { }