import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpProfissionalPageRoutingModule } from './exp-profissional-routing.module';

import { ExpProfissionalPage } from './exp-profissional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpProfissionalPageRoutingModule
  ],
  declarations: [ExpProfissionalPage]
})
export class ExpProfissionalPageModule {}
