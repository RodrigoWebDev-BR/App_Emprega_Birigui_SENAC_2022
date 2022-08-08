import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscricao-vaga',
  templateUrl: './inscricao-vaga.page.html',
  styleUrls: ['./inscricao-vaga.page.scss'],
})
export class InscricaoVagaPage implements OnInit {
  public inscricaoVaga = {
    quantidade: 20,
  };

  public vagas: any[] = [
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Birigui',
      quantidade: '5',
      salario: 'R$ 2500.00',
    },
    {
      nome: 'Médico',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: '1',
      salario: 'R$ 15000.00',
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Angra dos Reis',
      cidade: 'araçatuba',
      quantidade: '2',
      salario: 'R$ 2100.00',
    },
  ];

  public vaga = {};

  constructor(public nav: NavController) {}

  detalhes() {
    this.nav.navigateForward('vaga-detalhes');
  }

  ngOnInit() {}
}
