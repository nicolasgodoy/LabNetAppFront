import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './pages/add/add.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddComponent,
    ConsultComponent
  
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
