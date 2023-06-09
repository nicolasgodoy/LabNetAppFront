import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AddProfileComponent } from './pages/add-profile/add-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileSkillComponent } from './pages/profile-skill/profile-skill.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormBuilder,FormGroup,FormsModule,Validators } from '@angular/forms';
import { DialogDeleteComponent } from './pages/profile-skill/dialog-delete/dialog-delete.component';
import { DialogAddSkillComponent } from './pages/profile-skill/dialog-add-skill/dialog-add-skill.component';
import { FilterProfileBySkillComponent } from './pages/filter-profile-by-skill/filter-profile-by-skill.component';
import { UpdatePasswordProfileComponent } from './pages/update-password-profile/update-password-profile.component';
import { EditProfilePipePipe } from '../edit-profile-pipe.pipe';
import { HasProfileGuard } from '../guard/hasProfile.guard';
import { WorkComponent } from '../work/work.component';


@NgModule({
  declarations: [
    AddProfileComponent,
    EditProfileComponent,
    ProfileSkillComponent,
    FilterProfileBySkillComponent,
    DialogDeleteComponent,
    DialogAddSkillComponent,
    UpdatePasswordProfileComponent,
    EditProfilePipePipe,
    WorkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    FormsModule,
  ]
})
export class ProfileModule { }
