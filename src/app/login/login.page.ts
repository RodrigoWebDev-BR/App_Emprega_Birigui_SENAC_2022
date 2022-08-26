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
  candidato = { cpf: '', senha: '' };

  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public toast: ToastController,
    public mensagem: AlertController,
    private activated: ActivatedRoute
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
    } else if (this.candidato.senha === '' || this.candidato.senha === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário preencher a senha.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      if (this.candidato.cpf === 'a') {
        localStorage.setItem('menu', 'empregado');
      } else if (this.candidato.cpf === 'b') {
        localStorage.setItem('menu', 'empresa');
      } else if (this.candidato.cpf === 'c') {
        localStorage.setItem('menu', 'master');
      }

      this.nav.navigateRoot('home');
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
      this.candidato.cpf = formatarCpf(this.candidato.cpf);
    }
  }

  async ngOnInit() {
    if (localStorage.getItem('loginAuto') === 'true') {
      this.candidato.cpf = localStorage.getItem('CPF/CNPJ');
    }

    if (this.activated.snapshot.paramMap.get('id') === 'empregado') {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!',
        message: 'Seu cadastro foi realizado com sucesso, faça seu login.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.activated.snapshot.paramMap.get('id') === 'empresa') {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!',
        message:
          'Seu cadastro foi realizado com sucesso. Aguarde a prefeitura de Birigui autorizar seu acesso e tente realizar o login novamente dentro de 48 horas.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    }
  }
}
