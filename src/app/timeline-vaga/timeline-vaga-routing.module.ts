import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelineVagaPage } from './timeline-vaga.page';

const routes: Routes = [
  {
    path: '',
    component: TimelineVagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelineVagaPageRoutingModule {}
