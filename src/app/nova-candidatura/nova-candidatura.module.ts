import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaCandidaturaPageRoutingModule } from './nova-candidatura-routing.module';

import { NovaCandidaturaPage } from './nova-candidatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaCandidaturaPageRoutingModule
  ],
  declarations: [NovaCandidaturaPage]
})
export class NovaCandidaturaPageModule {}
