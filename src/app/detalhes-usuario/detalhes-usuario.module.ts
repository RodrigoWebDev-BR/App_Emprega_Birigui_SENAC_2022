import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesUsuarioPageRoutingModule } from './detalhes-usuario-routing.module';

import { DetalhesUsuarioPage } from './detalhes-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesUsuarioPageRoutingModule
  ],
  declarations: [DetalhesUsuarioPage]
})
export class DetalhesUsuarioPageModule {}
