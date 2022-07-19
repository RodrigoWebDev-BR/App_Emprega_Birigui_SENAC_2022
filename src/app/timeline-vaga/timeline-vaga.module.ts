import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelineVagaPageRoutingModule } from './timeline-vaga-routing.module';

import { TimelineVagaPage } from './timeline-vaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelineVagaPageRoutingModule
  ],
  declarations: [TimelineVagaPage]
})
export class TimelineVagaPageModule {}
