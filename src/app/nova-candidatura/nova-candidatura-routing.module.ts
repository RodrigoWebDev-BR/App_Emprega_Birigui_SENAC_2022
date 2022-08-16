import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaCandidaturaPage } from './nova-candidatura.page';

const routes: Routes = [
  {
    path: '',
    component: NovaCandidaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaCandidaturaPageRoutingModule {}
