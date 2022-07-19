import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscricaoVagaPageRoutingModule } from './inscricao-vaga-routing.module';

import { InscricaoVagaPage } from './inscricao-vaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscricaoVagaPageRoutingModule
  ],
  declarations: [InscricaoVagaPage]
})
export class InscricaoVagaPageModule {}
