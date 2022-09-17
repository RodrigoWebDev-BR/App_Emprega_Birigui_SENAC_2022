import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Button } from 'protractor';
import { ContatosService } from '../servicos/contatos.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  public contatos: any[] = [];

  contato = { id: '', contato: '', validado: false };

  tipoContato = [
    { id: '2', nome: 'Celular' },
    { id: '3', nome: 'Telefone' },
    { id: '4', nome: 'LinkedIn' },
    { id: '4', nome: 'Instagram' },
    { id: '4', nome: 'Facebook' },
  ];

  constructor(
    public nav: NavController,
    public mensagem: AlertController,
    public menuLeft: MenuController,
    public contatoServ: ContatosService
  ) {
    this.menuLeft.enable(false);
  }

  endereco() {
    this.nav.back();
  }

  async addContato(validado: boolean) {
    if (
      this.contato.id === null ||
      this.contato.id === '' ||
      this.contato.contato === '' ||
      this.contato.contato === null

    ) {
      //abrir o alert avisando que exitem campos vazios
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        subHeader: 'Insira um Contato',
        message: 'Necessário preencher todos os campos',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else {

      this.contato.validado = validado;

      const contatoCopy = JSON.parse(JSON.stringify(this.contato));
      this.contatos.push(contatoCopy);

      this.contatoServ.salvarContato(this.contato.id, this.contato.contato, this.contato.validado);

      this.contato.contato = '';
      this.contato.id = '';
      this.contato.validado;
    }
  };

definirPrincipal(){
  if(this.contatoServ.listar() !== undefined){
    const conclusao = this.contatoServ.listar().filter((contatos) => contatos.validado === true);
    if (conclusao.length ===0){
      this.mensagemPrincipal();
    }else{
      this.addContato(false);
    }
  }else{
    this.mensagemPrincipal();
  }
}

  async mensagemPrincipal(){
    const principal = await this.mensagem.create({
      header: 'ATENÇÃO',
      message:'Deseja definir este contato como principal?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            this.addContato(false);
          },
        },
        {
          text: 'Sim',
          handler: () => {
            this.addContato(true);
          },
        },
      ],
    });
    await principal.present();
    return; 
  }   

  async confirmar() {
    if (this.contatos.length > 0) {
      if (
        localStorage.getItem('nome') === null ||
        localStorage.getItem('nome') === undefined
      ) {
        this.nav.navigateForward('detalhes-empresa');
      } else {
        this.nav.navigateForward(['formacao-educacional']);
      }
    } else {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        subHeader: 'Insira um Contato',
        message: 'É necessario pelo menos um contato',
        buttons: ['OK'],
      });

      await alerta.present();
      return;
    }
  };
  async removerContato(contatosRemove) {
    const confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO',
      message:
        'Confirma a exclusão do contato ' + contatosRemove.contato + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('CANCELADO');
          },
        },
        {
          text: 'Sim',
          handler: () => {
            this.contatoServ.deletar(contatosRemove.contato);
            const index = this.contatos.indexOf(contatosRemove);
            this.contatos.splice(index, 1);
          },
        },
      ],
    });
    await confirmaRemover.present();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if (this.contatoServ.listar() !== undefined) {
      this.contatos = this.contatoServ.listar();
    }
  }
}
