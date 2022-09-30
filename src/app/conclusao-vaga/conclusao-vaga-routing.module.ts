import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConclusaoVagaPage } from './conclusao-vaga.page';

const routes: Routes = [
  {
    path: '',
    component: ConclusaoVagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConclusaoVagaPageRoutingModule {}
