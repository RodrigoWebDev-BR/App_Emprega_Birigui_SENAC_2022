import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VagaDetalhesPageRoutingModule } from './vaga-detalhes-routing.module';

import { VagaDetalhesPage } from './vaga-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VagaDetalhesPageRoutingModule
  ],
  declarations: [VagaDetalhesPage]
})
export class VagaDetalhesPageModule {}
