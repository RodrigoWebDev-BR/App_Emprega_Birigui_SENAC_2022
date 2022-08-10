import { MenuController, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  empresa = {
    nome: null,
    fantasia: null,
    cnpj: null,
    email: null,
    dataAb: null,
    cnae: null,
    situacao: null,
    natureza: null,
    senha: null,
    confirmacao: null,
  };

  public situacoes = [
    { id: '1', sitAtual: 'Ativo(a)' },
    { id: '2', sitAtual: 'Inativo(a)' },
  ];

  public naturezas = [
    { id: '1', naturezas: 'Perfil Subjetivo' },
    { id: '2', naturezas: 'Perfil Funcional' },
    { id: '3', naturezas: 'Perfil Objetivo ou Patrimonial' },
    { id: '4', naturezas: 'Perfil Corporativo' },
  ];

  constructor(
    public menuLeft: MenuController,
    public nav: NavController,
    public mensagem: AlertController
  ) {
    this.menuLeft.enable(false);
  }

  ngOnInit() {
    this.carregarDados();
  }

  async adicionarEmpresa() {
    if (this.empresa.nome === '' || this.empresa.nome === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o nome da empresa.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.cnpj === '' || this.empresa.cnpj === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o CNPJ.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.email === '' || this.empresa.email === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o E-Mail.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.dataAb === '' || this.empresa.dataAb === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a data de abertura da empresa.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.cnae === '' || this.empresa.cnae === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o número do CNAE.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.situacao === '' || this.empresa.situacao === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a situação atual da empresa.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.natureza === '' || this.empresa.natureza === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a natureza jurídica.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.senha === '' || this.empresa.senha === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar uma senha.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (
      this.empresa.confirmacao === '' ||
      this.empresa.confirmacao === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a confirmação da senha.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.empresa.senha !== this.empresa.confirmacao) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'As senhas precisam coincidir uma com a outra.',
        buttons: ['ok'],
      });
      await alerta.present();
    } else if (!this.validaEmail(this.empresa.email)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'E-Mail inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if(!this.validarCNPJ(this.empresa.cnpj)){
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'CNPJ inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;

    } else {
      this.salvarTemporariamente();
      this.nav.navigateForward('endereco');
    }
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

  salvarTemporariamente() {
    const [ano, mes, dia] = this.empresa.dataAb.split('-');

    localStorage.setItem('nomeEmpresa', this.empresa.nome);
    localStorage.setItem('fantasia', this.empresa.fantasia);
    localStorage.setItem('cnpj', this.empresa.cnpj);
    localStorage.setItem('email', this.empresa.email);
    localStorage.setItem('dataAb', dia + '/' + mes + '/' + ano);
    localStorage.setItem('cnae', this.empresa.cnae);
    localStorage.setItem('situacao', this.empresa.situacao);
    localStorage.setItem('natureza', this.empresa.natureza);
  }

  carregarDados() {
    this.empresa.nome = localStorage.getItem('nomeEmpresa');
    this.empresa.fantasia = localStorage.getItem('fantasia');
    this.empresa.cnpj = localStorage.getItem('cnpj');
    this.empresa.email = localStorage.getItem('email');

    if (localStorage.getItem('dataAb') !== null) {
      const [dia, mes, ano] = localStorage.getItem('dataAb').split('/');
      this.empresa.dataAb = ano + '-' + mes + '-' + dia;
    }

    this.empresa.cnae = localStorage.getItem('cnae');
    this.empresa.situacao = localStorage.getItem('situacao');
    this.empresa.natureza = localStorage.getItem('ocultarIdade');
  }

  validaEmail(email): boolean {
    if (
      !email.match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return;
    }
    return true;
  }

  validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') {
      return false;
    }

    if (cnpj.length !== 14) {
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return false;
    }
    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== digitos.charAt(0)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== digitos.charAt(1)) {
      return false;
    }

    return true;
  }
}
