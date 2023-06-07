import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { AddComponent } from './pages/add/add.component';
import { ConsultComponent } from './pages/consult/consult.component';


@NgModule({
  declarations: [
    AddComponent,
    ConsultComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule
  ]
})
export class SectorModule { }
