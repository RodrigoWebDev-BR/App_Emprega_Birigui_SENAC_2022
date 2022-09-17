import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoVagaPage } from './lancamento-vaga.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentoVagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoVagaPageRoutingModule {}
