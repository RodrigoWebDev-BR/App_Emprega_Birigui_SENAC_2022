import { LoginService } from './../servicos/login.service';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { formatarCpf } from 'src/environments/functions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  candidato = { cpf: '', password: '' };
  resp: any={};

  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public toast: ToastController,
    public mensagem: AlertController,
    private activated: ActivatedRoute,
    private authorize:LoginService
  ) {
    this.menuLeft.enable(false);
  }

  async confirmarLogin() {
    if (this.candidato.cpf === '' || this.candidato.cpf === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário preencher com seu CPF ou CNPJ.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.candidato.password === '' || this.candidato.password === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário preencher a senha.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      const type = this.candidato.cpf.includes('/') ? 'empresa' : 'empregado'

      this.authorize

        .login(this.candidato.cpf, this.candidato.password, type)

        .then((response) => {
          this.resp = response;

          if (this.resp === undefined) {
            this.exibeToast('Erro de resposta com o servidor.');
          } else {
            if (localStorage.getItem('loginAuto') === 'true') {
              localStorage.setItem('CPF/CNPJ', this.candidato.cpf);
            }

            this.candidato.cpf = '';

            this.candidato.password = '';

            localStorage.setItem('accessToken', this.resp.accessToken);
            localStorage.setItem('nomeMenu', this.resp.nome);
            localStorage.setItem('idUser', this.resp.id);
            localStorage.setItem('profile', this.resp.profile);

            this.nav.navigateRoot('home');
            
          }
        })

        .catch((e) => {
          if (this.candidato.cpf.includes('/')) {
            this.exibeToast('CNPJ ou senha inválidos');
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
    this.nav.navigateForward('cadastro');
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
    if (this.candidato.cpf !== '' && this.candidato.cpf !== null) {
      if(this.candidato.cpf.length <= 11){
      this.candidato.cpf = formatarCpf(this.candidato.cpf);
      }
    }
  }

  async ngOnInit() {
    if (localStorage.getItem('loginAuto') === 'true') {
      this.candidato.cpf = localStorage.getItem('CPF/CNPJ');
    }

    if (this.activated.snapshot.paramMap.get('id').includes('empregado_')) {
      const alerta = await this.mensagem.create({
        header: 'Seja bem vindo!',
        message: this.activated.snapshot.paramMap.get('id').split('_')[1] + ' seu cadastro foi realizado com sucesso, faça seu login',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.activated.snapshot.paramMap.get('id').includes('empresa_')) {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!',
        message: 'Olá ' + this.activated.snapshot.paramMap.get('id').split('_')[1] + '. Seu cadastro foi realizado com sucesso. Aguarde a prefeitura de Birigui autorizar seu acesso e tente realizar o login novamente dentro de 48 horas.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    }else if (this.activated.snapshot.paramMap.get('id').includes('erro')) {
      const alerta = await this.mensagem.create({
        header: 'Ops...',
        message: 'Não foi possível completar seu cadastro por erros internos, tente o cadastro novamente, se o erro persistir, entre em contato com a prefeitura de Birigui',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    }
  }
}
