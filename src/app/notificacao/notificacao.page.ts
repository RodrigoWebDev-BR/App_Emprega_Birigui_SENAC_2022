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
      vaga: 'Programador web',
      empresa: 'Senac',
      dtInsc: '12/05/2022',
      aprovado: true,
      status: 'Currículo cadastrado',
      hora: '20:40'
    },
    {
      vaga: 'Programador C#',
      empresa: 'Birigui TEC',
      dtInsc: '10/08/2022',
      aprovado: false,
      status: 'Currículo indeferido',
      hora: '22:10'
    },
    {
      vaga: 'Empacotador',
      empresa: 'Rondon',
      dtInsc: '15/07/2022',
      aprovado: true,
      status: 'Currículo selecionado',
      hora: '17:00'
    },
    {
      vaga: 'Mecânico',
      empresa: 'Araça Peças',
      dtInsc: '08/01/2022',
      aprovado: false,
      status: 'Currículo indeferido',
      hora: '07:20'
    }
  ];

  constructor(public nav: NavController) { }

  timeline(){
    this.nav.navigateRoot('timeline-vaga');
  }

  ngOnInit() {
  }

}
