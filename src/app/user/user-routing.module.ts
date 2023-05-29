import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultComponent } from './pages/consult/consult.component';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'consult', component: ConsultComponent},
      {path: 'insert', component: AddComponent}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
