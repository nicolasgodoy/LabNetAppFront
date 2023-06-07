import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { EditProfilePipePipe } from './edit-profile-pipe.pipe';
import { ProfileModule } from './profile/profile.module';
import { HomeComponent } from './home/home.component';
import { HasProfileGuard } from './guard/hasProfile.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DialogWorkComponent } from './profile/pages/dialog-work/dialog-work.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    DialogWorkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ProfileModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [HasProfileGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
