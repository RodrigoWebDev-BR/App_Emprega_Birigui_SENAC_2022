import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConclusaoVagaPageRoutingModule } from './conclusao-vaga-routing.module';

import { ConclusaoVagaPage } from './conclusao-vaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConclusaoVagaPageRoutingModule
  ],
  declarations: [ConclusaoVagaPage]
})
export class ConclusaoVagaPageModule {}
