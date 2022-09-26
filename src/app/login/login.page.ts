/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { formatarCNPJ } from './../../environments/functions';
import { MasterService } from './../servicos/master.service';
import { EmpregadoService } from './../servicos/empregado.service';
import { EmpresaService } from 'src/app/servicos/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { formatarCPF } from './../../environments/functions';
import { LoginService } from './../servicos/login.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = { cpf: '', password: '' };
  resp: any = {};
  itemAux: any = {};
  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public toast: ToastController,
    public mensagem: AlertController,
    public activated: ActivatedRoute,
    private authorize: LoginService,
    public servicoEmpresa: EmpresaService,
    public servicoEmpregado: EmpregadoService,
    public servicoMaster: MasterService
  ) {
    this.menuLeft.enable(false);
  }

  async ngOnInit() {
    if (localStorage.getItem('loginAuto') === 'true') {
      this.user.cpf = localStorage.getItem('CPF/CNPJ');
    }

    if (localStorage.getItem('nomeCadastro') === 'erro') {
      const alerta = await this.mensagem.create({
        header: 'Ops...',
        message:
          'Não foi possível completar seu cadastro por erros internos, tente o cadastro novamente, se o erro persistir, entre em contato com a prefeitura de Birigui.',
        buttons: ['OK'],
      });

      localStorage.clear();
      await alerta.present();

      return;
    }else if (localStorage.getItem('profileConcluido') === 'empregado') {
      const alerta = await this.mensagem.create({
        header: 'Seja Bem-Vindo!',
        message:
          localStorage.getItem('nomeCadastro') +
          ' seu cadastro foi realizado com sucesso, faça seu login.',
        buttons: ['OK'],
      });

      localStorage.clear();
      await alerta.present();

      return;
    } else if (localStorage.getItem('profileConcluido') === 'empresa') {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!!!',
        message:
          'Olá ' +
          localStorage.getItem('nomeCadastro') +
          // eslint-disable-next-line max-len
          ' seu cadastro foi realizado com sucesso. Aguarde a prefeitura de Birigui autorizar seu acesso e tente o login novamente dentro de 48 horas.',
        buttons: ['OK'],
      });

      localStorage.clear();
      await alerta.present();

      return;
    } else if (localStorage.getItem('profileConcluido') === 'user_master') {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!!!',
        message:
          'Olá ' +
          localStorage.getItem('nomeCadastro') +
          ' seu sistema agora está totalmente disponível para uso. Espalhe a palavra para todas empresas e cidadãos',
        buttons: ['OK'],
      });

      localStorage.clear();
      await alerta.present();

      return;
    }
  }

  async confirmarLogin() {
    if (this.user.cpf === '' || this.user.cpf === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        message: 'Necessário preencher com seu CPF ou CNPJ.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    } else if (this.user.password === '' || this.user.password === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        message: 'Necessário preencher a senha.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    } else {
      let type = this.user.cpf.includes('/') ? 'empresa' : 'empregado';
      type = this.user.cpf.includes('@') ? 'masters' : type;

      this.authorize
        .login(this.user.cpf, this.user.password, type)
        .then((response) => {
          this.resp = response;
          if (this.resp === undefined) {
            this.exibeToast('Erro de resposta com o servidor.');
          } else {
            if (localStorage.getItem('loginAuto') === 'true') {
              localStorage.setItem('CPF/CNPJ', this.user.cpf);
            }
            this.user.cpf = '';
            this.user.password = '';
            localStorage.setItem('accessToken', this.resp.accessToken);
            localStorage.setItem('idUser', this.resp.id);
            localStorage.setItem('profile', this.resp.profile);
            localStorage.setItem('nomeMenu', this.resp.nome);

            if (this.resp.profile === 'empresa') {
              this.servicoEmpresa
                .perfil()
                .then(async (emp) => {
                  this.itemAux = emp;
                  if (!this.itemAux.aceita && !this.itemAux.recusada) {
                    const alerta = await this.mensagem.create({
                      header: 'Paciência!',
                      message:
                        'Seu cadastro ainda não foi aprovado pela prefeitura de Birigui.',
                      buttons: ['OK'],
                    });

                    await alerta.present();

                    return;
                  } else if (!this.itemAux.aceita && this.itemAux.recusada) {
                    const alerta = await this.mensagem.create({
                      header: 'Desculpe',
                      message:
                        'Infelizmente sua empresa não foi aprovada pela prefeitura de birigui. Qualquer dúvida entre em contato pelo site http://www.birigui.sp.gov.br/',
                      buttons: ['OK'],
                    });

                    await alerta.present();

                    return;
                  } else {
                    this.nav.navigateRoot('home');
                  }
                })
                .catch();
            } else {
              this.nav.navigateRoot('home');
            }
          }
        })
        .catch((e) => {
          if (this.user.cpf.includes('/')) {
            this.exibeToast('CNPJ ou senha inválidos');
          } else if (this.user.cpf.includes('@')) {
            this.exibeToast('Email ou senha inválidos');
          } else {
            this.exibeToast('CPF ou senha inválidos');
          }
        });
    }
  }

  async exibeToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: 'warning',
    });

    toast.present();
  }

  cadastro() {
    this.servicoMaster
      .perfis()
      .then((e1) => {
        let ia1: any = [];
        ia1 = e1;
        ia1 = ia1.items;
        if (ia1.length === 0) {
          this.nav.navigateRoot('master');
        } else {
          this.nav.navigateRoot('cadastro');
        }
      })
      .catch();
  }

  recuperacao() {
    this.nav.navigateForward('recuperacao');
  }

  automatico($event) {
    if ($event.currentTarget.checked) {
      localStorage.setItem('loginAuto', 'true');
    } else {
      if (localStorage.getItem('loginAuto') !== null) {
        localStorage.removeItem('loginAuto');
      }
    }
  }

  loginInput(evento) {
    if (evento.key === 'Enter') {
      this.confirmarLogin();
    }
  }

  formataCpf() {
    if (this.user.cpf !== '' && this.user.cpf !== null) {
      if (!this.user.cpf.includes('@')) {
        if (this.user.cpf.length <= 14) {
          this.user.cpf = formatarCPF(this.user.cpf);
        } else {
          this.user.cpf = formatarCNPJ(this.user.cpf);
        }
      }
    }
  }
}
