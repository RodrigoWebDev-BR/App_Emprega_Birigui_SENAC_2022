import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidaturasPageRoutingModule } from './candidaturas-routing.module';

import { CandidaturasPage } from './candidaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidaturasPageRoutingModule
  ],
  declarations: [CandidaturasPage]
})
export class CandidaturasPageModule {}
