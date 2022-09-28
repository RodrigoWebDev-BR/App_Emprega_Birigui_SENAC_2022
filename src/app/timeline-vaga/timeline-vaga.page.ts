import { VagasService } from './../servicos/vagas.service';
import { EmpregadoService } from './../servicos/empregado.service';
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
  itemAux: any = {};
  constructor(private nav: NavController, public servicoEmpregado: EmpregadoService, public servicoVaga: VagasService) {}

  ngOnInit() {
    // this.
  }

  home(){
    this.nav.navigateRoot('home');
  }
}
