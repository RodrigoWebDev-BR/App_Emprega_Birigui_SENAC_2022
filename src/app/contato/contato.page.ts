import { ContatosService } from './../servicos/contatos.service';
import { CompilerFactory, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  public contatos: any[] = [];

  contato = { tipo: '', contato: '', principal: false };

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
    this.nav.navigateForward('formacao-educacional');
  }

  async addContato(principal: boolean) {
    if (
      this.contato.tipo === null ||
      this.contato.tipo  === '' ||
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
      this.contato.principal = principal;

      const contatoCopy = JSON.parse(JSON.stringify(this.contato));

      this.contatos.push(contatoCopy);

      this.contatoServ.salvarContato(
        this.contato.tipo ,
        this.contato.contato,
        this.contato.principal
      );

      this.contato.contato = '';
      this.contato.tipo  = '';
      this.contato.principal = false;
    }
  }

  async mainMsg() {
    const main = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja definir este contato como principal?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.addContato(true);
          },
        },
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            this.addContato(false);
          },
        },
      ],
    });

    await main.present();
  }

  setMain() {
    if (this.contatoServ.listar() !== undefined) {
      const conclusao = this.contatoServ
        .listar()
        .filter((contatos) => contatos.principal === true);

      if (conclusao.length === 0) {
        this.mainMsg();
      } else {
        this.addContato(false);
      }
    } else {
      this.mainMsg();
    }
  }

  async confirmar() {
    if (this.contatos.length > 0) {
      
      if(localStorage.getItem('editar') === 'true') {
        this.nav.navigateForward('revisao')
  
      }else{

        if (localStorage.getItem('nome') === null ||
            localStorage.getItem('nome') === undefined
        ) {
          this.nav.navigateForward(['detalhes-empresa']);
        } else {
          this.nav.navigateForward(['formacao-educacional']);
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
}
