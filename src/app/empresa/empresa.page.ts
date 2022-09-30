import { LoginService } from './../servicos/login.service';
import { validarCNPJ } from './../../environments/functions';
import {
  MenuController,
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { validaEmail } from 'src/environments/functions';

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
  public valida: boolean;
  constructor(
    public menuLeft: MenuController,
    public nav: NavController,
    public mensagem: AlertController,
    public gerais: LoginService,
    public toast: ToastController
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
    } else if (!validaEmail(this.empresa.email)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'E-Mail inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!validarCNPJ(this.empresa.cnpj)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'CNPJ inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.valida) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'CNPJ já cadastrado.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      this.salvarTemporariamente();

      if (localStorage.getItem('editar') === 'true') {
        this.nav.navigateForward('revisao');
      } else {
        this.nav.navigateForward('endereco');
      }
    }
  }

  async login() {
    const confirma = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja cancelar o seu cadastro? Todos os dados serão perdidos.',
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
    localStorage.setItem('nomeEmpresa', this.empresa.nome);
    localStorage.setItem('fantasia', this.empresa.fantasia);
    localStorage.setItem('cnpj', this.empresa.cnpj);
    localStorage.setItem('email', this.empresa.email);
    localStorage.setItem('dataAb', this.empresa.dataAb);
    localStorage.setItem('cnae', this.empresa.cnae);
    localStorage.setItem('situacao', this.empresa.situacao);
    localStorage.setItem('natureza', this.empresa.natureza);
    localStorage.setItem('password', this.empresa.senha);
  }

  carregarDados() {
    this.empresa.nome = localStorage.getItem('nomeEmpresa');
    this.empresa.fantasia = localStorage.getItem('fantasia');
    this.empresa.cnpj = localStorage.getItem('cnpj');
    this.empresa.email = localStorage.getItem('email');
    this.empresa.dataAb = localStorage.getItem('dataAb');
    this.empresa.cnae = localStorage.getItem('cnae');
    this.empresa.situacao = localStorage.getItem('situacao');
    this.empresa.natureza = localStorage.getItem('ocultarIdade');
  }

  verificaCnpj() {
    this.gerais
      .verificaDoc(this.empresa.cnpj, 'empresa')
      .then((r1) => {
        const itemAux: any = r1;
        if (itemAux !== undefined && itemAux !== null) {
          if (itemAux.validado) {
            this.exibeToast('Este CNPJ já está cadastrado', 'warning');
          }

          this.valida = itemAux.validado;
        }
      })
      .catch();
  }

  async exibeToast(msg: string, cor: string) {
    const toastConfirma = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toastConfirma.present();
  }
}
