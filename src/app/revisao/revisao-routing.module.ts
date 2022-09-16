import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisaoPage } from './revisao.page';

const routes: Routes = [
  {
    path: '',
    component: RevisaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisaoPageRoutingModule {}
