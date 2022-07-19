import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { UsuarioPage } from '../usuario/usuario.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'usuario',
    loadChildren: () => import('../usuario/usuario.module').then( m => m.UsuarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
