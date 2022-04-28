import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpProfissionalPage } from './exp-profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ExpProfissionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpProfissionalPageRoutingModule {}
