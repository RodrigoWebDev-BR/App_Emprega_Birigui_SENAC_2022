import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidaturasPage } from './candidaturas.page';

const routes: Routes = [
  {
    path: '',
    component: CandidaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidaturasPageRoutingModule {}
