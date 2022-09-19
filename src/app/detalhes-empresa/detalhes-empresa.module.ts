import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesEmpresaPageRoutingModule } from './detalhes-empresa-routing.module';

import { DetalhesEmpresaPage } from './detalhes-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesEmpresaPageRoutingModule
  ],
  declarations: [DetalhesEmpresaPage]
})
export class DetalhesEmpresaPageModule {}
