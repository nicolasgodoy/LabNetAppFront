import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSkillComponent } from './pages/profile-skill/profile-skill.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

const routes: Routes = [

  {
    path: 'profile-skill',
        component: ProfileSkillComponent
  },
  {
    path: 'add-profile/:id',
            component: AddProfileComponent
  },
  {
    path: 'edit-profile',
            component: EditProfileComponent, 
            data: {
              'modify' : true
            }
  },
  {
    path: 'consult-profile',
            component: EditProfileComponent, 
            data: {
              'modify' : false
            }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
