import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSkillComponent } from './pages/profile-skill/profile-skill.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ConsultProfileComponent } from './pages/consult-profile/consult-profile.component';
import { FilterProfileBySkillComponent } from './pages/filter-profile-by-skill/filter-profile-by-skill.component';

const routes: Routes = [

  {path:'',redirectTo:'profile-skill',pathMatch:'full'},
  {
    path: 'profile-skill',
        component: ProfileSkillComponent
  },
  {
    path: 'add-profile',
            component: AddProfileComponent
  },
  {
    path: 'edit-profile',
            component: EditProfileComponent
  },
  {
    path: 'consult-profile',
            component: ConsultProfileComponent
  },
  {
    path: 'filter-profile',
            component: FilterProfileBySkillComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
