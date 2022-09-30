import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoPageRoutingModule } from './endereco-routing.module';

import { EnderecoPage } from './endereco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoPageRoutingModule,
    IonicInputMaskModule
  ],
  declarations: [EnderecoPage]
})
export class EnderecoPageModule {}
