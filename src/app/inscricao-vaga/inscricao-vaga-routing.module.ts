import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscricaoVagaPage } from './inscricao-vaga.page';

const routes: Routes = [
  {
    path: '',
    component: InscricaoVagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscricaoVagaPageRoutingModule {}
