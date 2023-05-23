import { NgModule } from '@angular/core';
import { ConsultComponent } from './pages/consult/consult.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'consult', component: ConsultComponent}
      
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class SkillRoutingModule { }
