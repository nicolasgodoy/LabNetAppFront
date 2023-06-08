import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from '../sector/pages/add/add.component';
import { ConsultComponent } from './pages/consult/consult.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'add', component: AddComponent},
    ]
  },
  {
    path: '',
    children: [
      {path: 'consult', component: ConsultComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorRoutingModule { }
