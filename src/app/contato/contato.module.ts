import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContatoPageRoutingModule } from './contato-routing.module';
import { ContatoPage } from './contato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContatoPageRoutingModule,
    IonicInputMaskModule
  ],
  declarations: [ContatoPage]
})
export class ContatoPageModule {}
