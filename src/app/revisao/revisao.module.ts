import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisaoPageRoutingModule } from './revisao-routing.module';

import { RevisaoPage } from './revisao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisaoPageRoutingModule
  ],
  declarations: [RevisaoPage]
})
export class RevisaoPageModule {}
