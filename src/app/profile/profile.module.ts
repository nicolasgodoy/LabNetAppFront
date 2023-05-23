import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ConsultProfileComponent } from './pages/consult-profile/consult-profile.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddProfileComponent,
    EditProfileComponent,
    ConsultProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfileModule { }