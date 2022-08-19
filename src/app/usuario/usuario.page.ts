import { formatarCPF, formatarRG, validaCPF, validaEmail } from './../../environments/functions';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  public usuario = {
    nome: null,
    rg: null,
    cpf: null,
    email: null,
    dataNasc: null,
    genero: null,
    estadoCivil: null,
    senha: null,
    confirmacao: null,
  };

  public genero = [
    { id: '1', generoV: 'Masculino' },
    { id: '2', generoV: 'Feminino' },
    { id: '3', generoV: 'Outros' },
    { id: '4', generoV: 'Não informar' },
  ];

  public estadoCivil = [
    { id: '1', estadoAtual: 'Solteiro(a)' },
    { id: '2', estadoAtual: 'Casado(a)' },
    { id: '3', estadoAtual: 'União Estável' },
    { id: '4', estadoAtual: 'Divorciado(a)' },
    { id: '5', estadoAtual: 'Viúvo(a)' },
  ];

  constructor(
    public mensagem: AlertController,
    public nav: NavController,
    public menuLeft: MenuController
  ) {
    this.menuLeft.enable(false);
  }

  async login() {
    const confirma = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja cancelar o seu cadastro? Todos os dados serão peridos.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            localStorage.clear();
            this.nav.navigateRoot('login');
          },
        },
      ],
    });

    await confirma.present();
  }

  ngOnInit() {
    this.carregarDados();
  }

  async adicionarUsuario() {
    if (this.usuario.nome === '' || this.usuario.nome === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o nome.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.usuario.rg === '' || this.usuario.rg === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o RG.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.usuario.cpf === '' || this.usuario.cpf === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o CPF.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.usuario.email === '' || this.usuario.email === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o E-Mail.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.usuario.dataNasc === '' || this.usuario.dataNasc === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a data de nascimento.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.usuario.genero === '' || this.usuario.genero === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o gênero.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.usuario.estadoCivil === '' ||
      this.usuario.estadoCivil === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o estado civil atual.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.usuario.senha === '' || this.usuario.senha === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar uma senha.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.usuario.confirmacao === '' ||
      this.usuario.confirmacao === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a confirmação de senha.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.usuario.senha !== this.usuario.confirmacao) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'As senhas precisam coincidir uma com a outra.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!validaCPF(this.usuario.cpf)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'CPF inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!validaEmail(this.usuario.email)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'E-Mail inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      this.salvarTemporariamente();
      this.nav.navigateForward('endereco');
    }
  }

  salvarTemporariamente() {
    const [ano, mes, dia] = this.usuario.dataNasc.split('-');

    localStorage.setItem('nome', this.usuario.nome);
    localStorage.setItem('rg', this.usuario.rg);
    localStorage.setItem('cpf', this.usuario.cpf);
    localStorage.setItem('email', this.usuario.email);
    localStorage.setItem('dataNasc', dia + '/' + mes + '/' + ano);
    localStorage.setItem('genero', this.usuario.genero);
    localStorage.setItem('estadoCivil', this.usuario.estadoCivil);
  }

  carregarDados() {
    this.usuario.nome = localStorage.getItem('nome');
    this.usuario.rg = localStorage.getItem('rg');
    this.usuario.cpf = localStorage.getItem('cpf');
    this.usuario.email = localStorage.getItem('email');

    if (localStorage.getItem('dataNasc') !== null) {
      const [dia, mes, ano] = localStorage.getItem('dataNasc').split('/');
      this.usuario.dataNasc = ano + '-' + mes + '-' + dia;
    }

    this.usuario.genero = localStorage.getItem('genero');
    this.usuario.estadoCivil = localStorage.getItem('estadoCivil');
  }

  formataCpf() {
    this.usuario.cpf = formatarCPF(this.usuario.cpf);
  }

  formataRG() {
    this.usuario.rg = formatarRG(this.usuario.rg);
  }
}
