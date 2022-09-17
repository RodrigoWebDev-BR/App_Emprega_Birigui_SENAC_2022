import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LancamentoVagaPageRoutingModule } from './lancamento-vaga-routing.module';

import { LancamentoVagaPage } from './lancamento-vaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LancamentoVagaPageRoutingModule
  ],
  declarations: [LancamentoVagaPage]
})
export class LancamentoVagaPageModule {}
