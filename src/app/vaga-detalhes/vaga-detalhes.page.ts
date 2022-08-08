import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaga-detalhes',
  templateUrl: './vaga-detalhes.page.html',
  styleUrls: ['./vaga-detalhes.page.scss'],
})
export class VagaDetalhesPage implements OnInit {
  router: any;

  constructor(public nav: NavController) {}

  voltar() {
    this.nav.navigateForward('inscricao-vaga')
  }

  candidato(){
    this.nav.navigateRoot('timeline-vaga')
  }

  ngOnInit() {}
}
