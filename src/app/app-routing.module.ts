import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path:'',
      component : HomeComponent
  },
  {
    path: 'skill',
    loadChildren: () => import('./skill/skill.module').then(m => m.SkillModule)
  },

{   canActivate: [AuthGuard],
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'editProfile',
    component : EditProfileComponent
  }
  //{
  //  path: '**', pathMatch: 'full',
  // loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
