import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  vagaDisponivel = [
    {
      titulo: 'Programador web',
      status: 'Currículo cadastrado',
      salario: '4000',
      dataPub: '14/06',
    },
    {
      titulo: 'Programador C#',
      status: 'Currículo cadastrado',
      salario: '2000',
      dataPub: '14/06',
    },
    {
      titulo: 'Programador Fullstack',
      status: 'Currículo cadastrado',
      salario: '6000',
      dataPub: '14/06',
    },
  ];

  constructor(public nav: NavController, public menuLeft: MenuController) {
    this.menuLeft.enable(true);
  }

  abrirVaga() {
    this.nav.navigateForward('timeline-vaga')
  }

  ngOnInit() {}
}
