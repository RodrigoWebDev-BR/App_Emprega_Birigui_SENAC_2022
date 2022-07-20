import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormacaoEducacionalPage } from './formacao-educacional.page';

const routes: Routes = [
  {
    path: '',
    component: FormacaoEducacionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormacaoEducacionalPageRoutingModule {}
