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
    ocultarIdade: null,
    estaEmpregado: null,
    senha: null,
    confirmacao: null
  }

  public genero = [
    { id: "1", generoV: "Masculino" },
    { id: "2", generoV: "Feminino" },
    { id: "3", generoV: "Outros" },
    { id: "4", generoV: "Não informar" }
  ]

  public estadoCivil = [
    { id: "1", estadoAtual: "Solteiro(a)" },
    { id: "2", estadoAtual: "Casado(a)" },
    { id: "3", estadoAtual: "União Estável" },
    { id: "4", estadoAtual: "Divorciado(a)" },
    { id: "5", estadoAtual: "Viúvo(a)" }
  ]

  public ocultarIdade = [
    { id: "1", ocultarAge: "SIM" },
    { id: "2", ocultarAge: "NÃO" }
  ]

  public estaEmpregado = [
    { id: "1", estaEmp: "SIM" },
    { id: "2", estaEmp: "NÃO" }
  ]

  constructor(public mensagem: AlertController, public nav: NavController, public menuLeft: MenuController) { this.menuLeft.enable(false) }

  async login() {
    const confirma = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja cancelar o seu cadastro? Todos os dados serão peridos.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler:() =>{
            localStorage.clear();
            this.nav.navigateRoot('login');
          }
        }
      ]
    });


    await confirma.present();
  }

  ngOnInit() {
    this.carregarDados();
  }

  async adicionarUsuario() {

    if (this.usuario.nome === '' || this.usuario.nome === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o nome.',
          buttons: ['ok']
        }
      );
      await alerta.present()

      return;

    } else if (this.usuario.rg === '' || this.usuario.rg === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o RG.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;

    } else if (this.usuario.cpf === '' || this.usuario.cpf === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o CPF.',
          buttons: ['ok']
        }
      )

      await alerta.present()

      return
    } else if (this.usuario.email === '' || this.usuario.email === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o E-Mail.',
          buttons: ['ok']
        }
      )

      await alerta.present()

      return;
    } else if (this.usuario.dataNasc === '' || this.usuario.dataNasc === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a data de nascimento.',
          buttons: ['ok']
        }
      )

      await alerta.present()

      return;
    } else if (this.usuario.genero === '' || this.usuario.genero === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o gênero.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;
    } else if (this.usuario.estadoCivil === '' || this.usuario.estadoCivil === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o estado civil atual.',
          buttons: ['ok']
        }
      )

      await alerta.present();

      return;
    } else if (this.usuario.ocultarIdade === '' || this.usuario.ocultarIdade === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar se deseja ocultar a idade.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    } else if (this.usuario.estaEmpregado === '' || this.usuario.estaEmpregado === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar se está empregado.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    } else if (this.usuario.senha === '' || this.usuario.senha === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar uma senha.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    } else if (this.usuario.confirmacao === '' || this.usuario.confirmacao === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar a confirmação de senha.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;
    } else if (this.usuario.senha !== this.usuario.confirmacao) {

      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'As senhas precisam coincidir uma com a outra.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;

    } else if (!this.validaCPF(this.usuario.cpf)) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'CPF inválido.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;

    } else if (!this.validaEmail(this.usuario.email)) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'E-Mail inválido.',
          buttons: ['ok']
        }
      );

      await alerta.present();

      return;

    } else {
      this.salvarTemporariamente();
      this.nav.navigateForward('endereco');
    }
  }

  salvarTemporariamente() {
    const [ano, mes, dia] = this.usuario.dataNasc.split('-');

    localStorage.setItem('nome', this.usuario.nome)
    localStorage.setItem('rg', this.usuario.rg)
    localStorage.setItem('cpf', this.usuario.cpf)
    localStorage.setItem('email', this.usuario.email)
    localStorage.setItem('dataNasc', dia + '/' + mes + '/' + ano)
    localStorage.setItem('genero', this.usuario.genero)
    localStorage.setItem('estadoCivil', this.usuario.estadoCivil)
    localStorage.setItem('ocultarIdade', this.usuario.ocultarIdade)
    localStorage.setItem('estaEmpregado', this.usuario.estaEmpregado)
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
    this.usuario.ocultarIdade = localStorage.getItem('ocultarIdade');
    this.usuario.estaEmpregado = localStorage.getItem('estaEmpregado');
  }

  validaCPF(cpf): boolean {
    /*eslint one-var: ["error", "always"]*/
    let rest, sum;

    if (cpf === undefined || cpf.trim().length === 0 || cpf === '00000000000') {
      return;
    }
    cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    sum = 0;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(cpf.substring(10, 11), 10)) {
      return false;
    }

    return true;
  }

  validaEmail(email): boolean {
    // eslint-disable-next-line max-len
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return;
    }
    return true;
  }

}
