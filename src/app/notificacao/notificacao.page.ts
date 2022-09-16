import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.page.html',
  styleUrls: ['./notificacao.page.scss'],
})
export class NotificacaoPage implements OnInit {

  public notificacoes = [
    {
      vaga: 'programador C#',
      empresa: 'Senac',
      dtInsc: '12/05/2022',
      aprovado: true,
      status: 'Currículo cadastrado',
      hora: '20:40',
    },
    {
      vaga: 'programador Angular',
      empresa: 'Senac',
      dtInsc: '12/05/2022',
      aprovado: false,
      status: 'Currículo indeferido',
      hora: '20:40',
    },
    {
      vaga: 'programador C++',
      empresa: 'Senac',
      dtInsc: '12/05/2022',
      aprovado: true,
      status: 'Currículo cadastrado',
      hora: '20:40',
    },
    {
      vaga: 'programador React',
      empresa: 'Senac',
      dtInsc: '12/05/2022',
      aprovado: false,
      status: 'Currículo indeferido',
      hora: '20:40',
    },
  ];

  constructor(public nav: NavController) {}

  timeline(){
    this.nav.navigateRoot('timeline-vaga')
  }

  ngOnInit() {}
}
