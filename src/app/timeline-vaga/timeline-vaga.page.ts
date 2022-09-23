import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-vaga',
  templateUrl: './timeline-vaga.page.html',
  styleUrls: ['./timeline-vaga.page.scss'],
})
export class TimelineVagaPage implements OnInit {
  contato = { contato: '', id: '' };

  constructor(private nav: NavController) {}

  ngOnInit() {}

  home(){
    this.nav.navigateRoot('home');
  }
}
