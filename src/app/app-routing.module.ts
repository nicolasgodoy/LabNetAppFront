import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile/profile-routing.module';

const routes: Routes = [
  {
    path: 'skill',
    loadChildren: () => import('./skill/skill.module').then(m => m.SkillModule)
  },
  {
    path: 'editProfile',
    component : EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
