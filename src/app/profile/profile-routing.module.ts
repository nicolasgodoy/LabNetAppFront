import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSkillComponent } from './pages/profile-skill/profile-skill.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FilterProfileBySkillComponent } from './pages/filter-profile-by-skill/filter-profile-by-skill.component';
import { UpdatePasswordProfileComponent } from './pages/update-password-profile/update-password-profile.component';

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
    path: 'edit-profile/:id',
            component: EditProfileComponent,
            data: {
              'modify' : true
            }
  },
  {
    path: 'consult-profile/:id',
            component: EditProfileComponent,
            data: {
              'modify' : false
            }
  },
  {
    path: 'filter-profile',
            component: FilterProfileBySkillComponent
  },
  {
    path: 'update-password',
            component: UpdatePasswordProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
