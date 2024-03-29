import { formataCelular } from './../../environments/functions';
import { ContatosService } from './../servicos/contatos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  public contatos: any[] = [];
  exibir = { cel: false, tel: false, neutro: false };
  contato = { tipo: '', contato: '', validado: false };

  tipoContato = [
    { id: '1', nome: 'Celular' },
    { id: '2', nome: 'Telefone' },
    { id: '3', nome: 'LinkedIn' },
    { id: '4', nome: 'Instagram' },
    { id: '5', nome: 'Facebook' },
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

  definirPrincipal() {
    if (this.contato.tipo === 'Celular' || this.contato.tipo === 'Telefone') {
      if (this.contatoServ.listar() !== undefined) {
        const conclusao = this.contatoServ
          .listar()
          .filter((contatos) => contatos.validado === true);

        if (conclusao.length === 0) {
          this.mensagemPrincipal();
        } else {
          this.addContato(false);
        }
      } else {
        this.mensagemPrincipal();
      }
    } else {
      this.addContato(false);
    }
  }

  async mensagemPrincipal() {
    const definir = await this.mensagem.create({
      header: 'ATENÇÃO',
      message: 'Deseja definir este contato como principal?',
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
    await definir.present();
  }

  async addContato(validado: boolean) {
    if (
      this.contato.tipo === null ||
      this.contato.tipo === '' ||
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

      //return para cancelar a execução do método
      return;
    } else {
      this.contato.validado = validado;
      const contatoCopy = JSON.parse(JSON.stringify(this.contato));

      this.contatos.push(contatoCopy);

      this.contatoServ.salvarContato(
        this.contato.tipo,
        this.contato.contato,
        this.contato.validado
      );

      this.contato.contato = '';
      this.contato.tipo = '';
      this.contato.validado = false;
    }
  }

  async confirmar() {
    if (this.contatos.length > 0) {
      if (localStorage.getItem('profile') === 'empregado') {
        if (localStorage.getItem('editar') === 'true') {
          this.nav.navigateRoot('revisao');
        } else {
          this.nav.navigateForward('formacao-educacional');
        }
      } else {
        if (localStorage.getItem('editar') === 'true') {
          this.nav.navigateRoot('revisao');
        } else {
          this.nav.navigateForward('detalhes-empresa');
        }
      }
    } else {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        subHeader: 'Insira um Contato',
        message: 'É necessário pelo menos um contato',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    }
  }

  async removerContato(contatosRemove) {
    const confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO',
      message:
        'Confirma a exclusão do contato ' + contatosRemove.contato + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {},
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

  inputMask() {
    switch (this.contato.tipo) {
      case 'Celular':
        // this.contato.contato = formataCelular(this.contato.contato);
        this.exibir.cel = true;
        this.exibir.tel = false;
        this.exibir.neutro = false;
        break;

      case 'Telefone':
        this.exibir.tel = true;
        this.exibir.cel = false;
        this.exibir.neutro = false;
        break;

      default:
        this.exibir.neutro = true;
        this.exibir.tel = false;
        this.exibir.cel = false;
        break;
    }
  }
}
