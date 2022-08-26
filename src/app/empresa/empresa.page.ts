import { validarCNPJ, validaEmail } from './../../environments/functions';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  public empresa = {
    nomeEmp: null,
    nomeFant: null,
    cnpj: null,
    email:null,
    dtAbertura: null,
    situacao: null,
    atividades: null,
    natureza: null,
    senha:null,
    confirmacao:null,
  }

  public situacao =[
    {id:'1', situa:'Ativa'},
    {id:'1', situa:'Inativa'}
  ]

  public natureza =[
    {id:'1', natJuridica:'Perfil Subjetivo'},
    {id:'1', natJuridica:'Perfil Funcional'},
    {id:'1', natJuridica:'Perfil Objetivo ou Patrimonial'},
    {id:'1', natJuridica:'Perfil Corporativo'}
  ]

  constructor(public mensagem: AlertController, public nav: NavController, public menuLeft: MenuController ) {
    this.menuLeft.enable(false)
  }

  async login() {
    const confirma = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja cancelar o seu cadastro? todos os dados serão perdidos',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler:() => { 
            localStorage.clear();
            this.nav.navigateRoot('login/login');
          }
        }
      ]
    });

    await confirma.present();

  }

  async adicionarEmpresa() {

    if (this.empresa.nomeEmp === '' || this.empresa.nomeEmp === null) {

      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o nome empresarial.',
          buttons: ['ok']
        }
      );
      await alerta.present()

      return;

    } else if (this.empresa.cnpj === '' || this.empresa.cnpj === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o CNPJ.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;

    } else if (this.empresa.dtAbertura === '' || this.empresa.dtAbertura === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a data de abertura.',
          buttons: ['ok']
        }
      )

      await alerta.present()

      return
    } else if (this.empresa.situacao === '' || this.empresa.situacao === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a situação jurídica.',
          buttons: ['ok']
        }
      )

      await alerta.present()

      return;
    } else if (this.empresa.atividades === '' || this.empresa.atividades === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar as atividades ecônomicas.',
          buttons: ['ok']
        }
      )

      await alerta.present()

      return;
    } else if (this.empresa.natureza === '' || this.empresa.natureza === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a natureza empresarial.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;
    } else if (this.empresa.natureza === '' || this.empresa.natureza === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a natureza jurídica.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;
    } else if (!validaEmail(this.empresa.email)) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar um email válido.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    }else if (this.empresa.senha === '' || this.empresa.senha === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar uma senha.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    } else if (this.empresa.confirmacao === '' || this.empresa.confirmacao === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a confirmação de senha.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    } else if (this.empresa.senha !== this.empresa.confirmacao) {

      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'As senhas precisam coincidir uma com a outra.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;

    }else if(!validarCNPJ(this.empresa.cnpj)) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'CNPJ inválido',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;
    }else{
      this.salvarTemporariamente();
      this.nav.navigateForward('endereco');
    }

  }

  salvarTemporariamente() {

    const [ano, mes, dia] = this.empresa.dtAbertura.split('-');

    localStorage.setItem('nomeEmp', this.empresa.nomeEmp)
    localStorage.setItem('nomeFant', this.empresa.nomeFant)
    localStorage.setItem('cnpj', this.empresa.cnpj)
    localStorage.setItem('email', this.empresa.email)
    localStorage.setItem('dataAbert', dia + '/' + mes + '/' + ano)
    localStorage.setItem('situacao', this.empresa.situacao)
    localStorage.setItem('atividades', this.empresa.atividades)
    localStorage.setItem('natureza', this.empresa.natureza)
  }

  carregarDados() {

    this.empresa.nomeEmp = localStorage.getItem('nomeEmp');
    this.empresa.nomeFant = localStorage.getItem('nomeFant');
    this.empresa.cnpj = localStorage.getItem('cnpj');
    this.empresa.email = localStorage.getItem('email');
    if (localStorage.getItem('dataAbert') !== null) {
      const [dia, mes, ano] = localStorage.getItem('dataAbert').split('/')
      this.empresa.dtAbertura = ano + '-' + mes + '-' + dia;
    }
    this.empresa.situacao = localStorage.getItem('situacao');
    this.empresa.atividades = localStorage.getItem('atividades');
    this.empresa.natureza = localStorage.getItem('natureza');
  }
  
  ngOnInit() {
    this.carregarDados();
  }

}
