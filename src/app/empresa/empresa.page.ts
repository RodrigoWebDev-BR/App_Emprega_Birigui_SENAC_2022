import { validaEmail, validarCNPJ } from './../../environments/functions';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  public empresa = {
    nome: null,
    cnpj: '',
    email: '',
    fantasia: '',
    dataAbert: '',
    situacao: '',
    natureza: '',
    cnae: '',
    senha: '',
    confirmacao: null
  }

  public natureza = [
    { id: '1', naturezaJ: 'Perfil subjetivo' },
    { id: '2', naturezaJ: 'Perfil funcional' },
    { id: '3', naturezaJ: 'Perfil objetivo' },
    { id: '4', naturezaJ: 'Perfil objetivo ou patrimonial' },
    { id: '5', naturezaJ: 'Perfil corporativo' }
  ]

  public situacao = [
    { id: '1', situacaoJ: 'Ativa' },
    { id: '2', situacaoJ: 'Inativa' },
  ]

  constructor(public mensagem: AlertController , public nav: NavController, public menuLeft: MenuController) { 
    this.menuLeft.enable(false);
  }

  async login() {
    const confirma = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja cancelar o seu cadastro? Todos os dados serão perdidos.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            localStorage.clear();
            this.nav.navigateRoot('login/login');
            
          }
        }
      ]
    });
    await confirma.present();
  }

  async ngOnInit() {
    await this.carregarDados();
  }

  async adicionarEmpresa() {
    if (this.empresa.nome === '' || this.empresa.nome === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'Não é permitido adicionar uma empresa sem nome.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    } else if (this.empresa.cnpj === '' || this.empresa.cnpj === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'Não é permitido adicionar uma empresa sem CNPJ.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.email === '' || this.empresa.email === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o E-mail.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.dataAbert === '' || this.empresa.dataAbert === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a data de abertura da empresa.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.situacao === '' || this.empresa.situacao === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a situação da empresa.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.natureza === '' || this.empresa.natureza === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a natureza da empresa.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.cnae === '' || this.empresa.cnae === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o CNAE da empresa.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.senha === '' || this.empresa.senha === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a confirmação de senha',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.confirmacao === '' || this.empresa.confirmacao === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'As senhas precisam coincidir uma com a outra',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return

    }
    else if (this.empresa.confirmacao === '' || this.empresa.confirmacao === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a confirmação de senha.',
          buttons: ['ok'],
        }
      )
      await alerta.present()
      return
      
    }

    else if (!validaEmail(this.empresa.email)) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'E-mail inválido',
          buttons: ['ok']
       }
      );
     await alerta.present();
     return;

    } else if(!validarCNPJ(this.empresa.cnpj)){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'CNPJ inválido',
          buttons: ['ok']
       }
      );
     await alerta.present();
     return;

    }else {
    this.salvarTemporariamente();
    this.nav.navigateForward('endereco');
    }
  }
  
  salvarTemporariamente() {
    const [ano, mes, dia] = this.empresa.dataAbert.split(',')

    localStorage.setItem('nomeEmpresa', this.empresa.nome)
    localStorage.setItem('fantasia', this.empresa.fantasia)
    localStorage.setItem('cnpj', this.empresa.cnpj)
    localStorage.setItem('email', this.empresa.email)
    localStorage.setItem('datAbert', dia + '/' + mes + '/' + ano)
    localStorage.setItem('cnae', this.empresa.cnae)
    localStorage.setItem('situacaoCad', this.empresa.situacao)
    localStorage.setItem('natureza', this.empresa.natureza)
    localStorage.setItem('password', this.empresa.senha)
  }

  carregarDados() {

    this.empresa.nome = localStorage.getItem('nome')
    this.empresa.cnpj = localStorage.getItem('cnpj')
    this.empresa.email = localStorage.getItem('email')
    this.empresa.dataAbert = localStorage.getItem('dataAbert')


    if (localStorage.getItem('datNasc') !== null) {
      const [dia, mes, ano] = localStorage.getItem('dataNasc').split('/')
      this.empresa.dataAbert = ano + '-' + mes + '-' + dia;
    }

    this.empresa.situacao = localStorage.getItem('situacao')
    this.empresa.natureza = localStorage.getItem('natureza')
    this.empresa.cnae = localStorage.getItem('cnae')
  }  

}
