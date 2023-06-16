import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/pages/login.component';
const routes: Routes = [
 
  {
    path:'home',
      component : HomeComponent
  },
  { canActivate: [AuthGuard],
    path: 'skill',
    loadChildren: () => import('./skill/skill.module').then(m => m.SkillModule)
  },
  { canActivate: [AuthGuard],
    path: 'sector',
    loadChildren: () => import('./sector/sector.module').then(m => m.SectorModule)
  },
  { canActivate: [AuthGuard],
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    canActivate: [AuthGuard],
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
