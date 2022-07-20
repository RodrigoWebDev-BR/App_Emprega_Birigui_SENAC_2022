import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormacaoEducacionalPageRoutingModule } from './formacao-educacional-routing.module';

import { FormacaoEducacionalPage } from './formacao-educacional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormacaoEducacionalPageRoutingModule
  ],
  declarations: [FormacaoEducacionalPage]
})
export class FormacaoEducacionalPageModule {}
