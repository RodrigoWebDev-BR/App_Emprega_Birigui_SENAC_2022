import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesUsuarioPage } from './detalhes-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesUsuarioPageRoutingModule {}
