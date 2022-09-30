/* eslint-disable max-len */
import { EmpresaService } from './../servicos/empresa.service';
import { EmpregadoService } from './../servicos/empregado.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { validaEmail } from './../../environments/functions';
import { RecuperacaoService } from './../servicos/recuperacao.service';
import { Router } from '@angular/router';
import {
  MenuController,
  NavController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.page.html',
  styleUrls: ['./recuperacao.page.scss'],
})
export class RecuperacaoPage implements OnInit {
  email = { email: '' };
  senha = { senha: '', confirmacao: '' };
  itemAux: any = {};
  nextStep: boolean = false;
  finalStep: boolean = false;
  joker = { recovery: null };
  mister: string;
  idNoob: string;
  user: string;
  celPhone: string;
  master: number;
  css: string;
  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public servicoRecuperacao: RecuperacaoService,
    public toast: ToastController,
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService,
    public mensagem: AlertController
  ) {
    this.menuLeft.enable(false);
  }

  login() {
    this.nav.navigateRoot('login');
  }

  recuperacao() {
    if (!validaEmail(this.email.email)) {
      this.exibeToast('E-mail incorreto', 'warning');

      return;
    }

    this.servicoRecuperacao
      .verificaDoc(this.email.email, 'empresa')
      .then((e1) => {
        this.itemAux = e1;
        if (this.itemAux.validado) {
          const aux = this.itemAux.contatos.filter(
            (a) => a.validado && a.tipo === 'Celular'
          );
          if (aux.length > 0) {
            this.celPhone = aux[0].contato;
            this.iniciarRecovery(
              'empresa',
              this.itemAux.idRecovery,
              this.geraAleatorio()
            );
          } else {
            this.alerta(
              'Infelizmente não encontramos nenhum número de celular associado ao seu cadastro. Entre em contato com a prefeitura de birigui pelo site www.birigui.sp.gov.br/',
              'Desculpe'
            );
          }
        } else {
          this.servicoRecuperacao
            .verificaDoc(this.email.email, 'empregado')
            .then((e2) => {
              this.itemAux = e2;
              if (this.itemAux.validado) {
                const aux = this.itemAux.contatos.filter(
                  (a) => a.validado && a.tipo === 'Celular'
                );
                if (aux.length > 0) {
                  this.celPhone = aux[0].contato;
                  this.iniciarRecovery(
                    'empregado',
                    this.itemAux.idRecovery,
                    this.geraAleatorio()
                  );
                } else {
                  this.alerta(
                    'Infelizmente não encontramos nenhum número de celular associado ao seu cadastro. Entre em contato com a prefeitura de birigui pelo site www.birigui.sp.gov.br/',
                    'Desculpe'
                  );
                }
              } else {
                this.exibeToast('E-mail não existe', 'warning');
              }
            })
            .catch((e3) => {
              this.exibeToast('E-mail não existe', 'warning');
            });
        }
      })
      .catch((e4) => {
        this.servicoRecuperacao
          .verificaDoc(this.email.email, 'empregado')
          .then((e5) => {
            this.itemAux = e5;
            if (this.itemAux.validado) {
              const aux = this.itemAux.contatos.filter(
                (a) => a.validado && a.tipo === 'Celular'
              );
              if (aux.length > 0) {
                this.celPhone = aux[0].contato;
                this.iniciarRecovery(
                  'empregado',
                  this.itemAux.idRecovery,
                  this.geraAleatorio()
                );
              } else {
                this.alerta(
                  'Infelizmente não encontramos nenhum número de celular associado ao seu cadastro. Entre em contato com a prefeitura de birigui pelo site www.birigui.sp.gov.br/',
                  'Desculpe'
                );
              }
            } else {
              this.exibeToast('E-mail não existe', 'warning');
            }
          })
          .catch((e6) => {
            this.exibeToast('E-mail não existe', 'warning');
          });
      });
  }

  iniciarRecovery(userType: string, id: string, aleatorio: number) {
    this.nextStep = true;
    this.idNoob = id;
    this.user = userType;
    this.mister = this.celPhone.split('-')[1];
    this.celPhone = this.celPhone
      .replace('-', '')
      .replace('(', '')
      .replace(')', '')
      .replace(' ', '');
    const doc = { numberRecovery: aleatorio };
    if (userType === 'empregado') {
      this.servicoEmpregado
        .patchUserId(doc, '', id)
        .then((e1) => {
          this.enviaSms(aleatorio);
        })
        .catch((e2) => {
          this.exibeToast('Erro', 'danger');
        });
    } else if (userType === 'empresa') {
      this.servicoEmpresa
        .patchEmpresa(doc, '', id)
        .then((e3) => {
          this.enviaSms(aleatorio);
        })
        .catch((e4) => {
          this.exibeToast('Erro', 'danger');
        });
    }
  }

  enviaSms(keyRecovery: number) {
    this.master = keyRecovery;

    this.servicoRecuperacao
      .enviarSms(this.celPhone, 'Sua senha para recuperação: ' + keyRecovery)
      .then((e1) => {
        this.exibeToast('SMS Enviado', 'success');
      })
      .catch((e2) => {
        this.exibeToast('Erro para lhe enviar o SMS', 'danger');

      });
  }

  finaliza(evento) {

    if (evento.detail.value.length > 4) {
      if (this.master === parseInt(evento.detail.value, 10)) {
        this.finalStep = true;
        this.css = 'esconde';
      }
    }
  }

  alterarSenha() {
    if (this.senha.senha === null || this.senha.senha === '') {
      this.alerta('Necessário preencher a senha', 'Atenção');
    } else if (
      this.senha.confirmacao === null ||
      this.senha.confirmacao === ''
    ) {
      this.alerta('Necessário preencher a confirmação de senha', 'Atenção');
    } else if (this.senha.confirmacao !== this.senha.confirmacao) {
      this.alerta('Senha e confirmação estão diferentes', 'Atenção');
    } else {
      const doc = {
        password: this.senha.senha,
      };

      if (this.user === 'empregado') {
        this.servicoEmpregado
          .patchUserId(doc, '', this.idNoob)
          .then((e1) => {
            localStorage.setItem('recovery', 'ok');
            this.nav.navigateRoot('login');
          })
          .catch((e2) => {
            this.exibeToast('Erro', 'danger');
          });
      } else if (this.user === 'empresa') {
        this.servicoEmpresa
          .patchEmpresa(doc, '', this.idNoob)
          .then((e3) => {
            localStorage.setItem('recovery', 'ok');
            this.nav.navigateRoot('login');
          })
          .catch((e4) => {
            this.exibeToast('Erro', 'danger');
          });
      }
    }
  }

  async exibeToast(msg, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }

  async alerta(msg: string, cabecao: string) {
    const alerta = await this.mensagem.create({
      header: cabecao,
      message: msg,
      buttons: ['OK'],
    });
    await alerta.present();

    return;
  }

  geraAleatorio(): number {
    const aleatorio: number = Math.random() * (99899 - 10000) + 10000;
    return parseInt(aleatorio.toString(), 10);
  }

  ngOnInit() {
  }
}
