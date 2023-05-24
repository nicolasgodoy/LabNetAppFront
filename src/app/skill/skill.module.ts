import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultComponent } from './pages/consult/consult.component';
import { AddComponent } from './pages/add/add.component';
import { SkillRoutingModule } from './skill-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DeleteComponent } from './pages/delete/delete.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ConsultComponent,
    AddComponent,
    DeleteComponent
    
  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class SkillModule { }
