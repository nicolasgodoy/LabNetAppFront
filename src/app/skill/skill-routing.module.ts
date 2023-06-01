import { NgModule } from '@angular/core';
import { ConsultComponent } from './pages/consult/consult.component';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'consult', component: ConsultComponent},
      {path: 'Insert', component: AddComponent}
      
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
