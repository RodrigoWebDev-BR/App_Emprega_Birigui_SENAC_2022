import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.page.html',
  styleUrls: ['./notificacao.page.scss'],
})
export class NotificacaoPage implements OnInit {

  notificacao = {id: '',not:''}

  tipoNot = [
    {id: '1', nome:'Vagas abertas'},
    {id: '2', nome:'Currículo em análise'},
    {id: '3', nome:'Currículo enviado'},
    {id: '4', nome:'Processo seletivo'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
