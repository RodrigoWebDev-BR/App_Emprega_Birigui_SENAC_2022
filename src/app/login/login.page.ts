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
  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public toast: ToastController,
    public mensagem: AlertController,
    public activated: ActivatedRoute,
    private authorize: LoginService
  ) {
    this.menuLeft.enable(false);
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
      const type = this.user.cpf.includes('/') ? 'empresa' : 'empregado';

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

          this.nav.navigateRoot('home');
        }
      })
      .catch((e) => {
        if (this.user.cpf.includes('/')) {
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

  async ngOnInit() {
    if (localStorage.getItem('loginAuto') === 'true') {
      this.user.cpf = localStorage.getItem('CPF/CNPJ');
    }

    if (this.activated.snapshot.paramMap.get('id') === 'empregado') {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!!!',
        message: 'Seu cadastro foi realizado com sucesso, faça seu login.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    } else if (this.activated.snapshot.paramMap.get('id') === 'empresa') {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!!!',
        message:
          // eslint-disable-next-line max-len
          'Seu cadastro foi realizado com sucesso. Aguarde a prefeitura de Birigui autorizar seu acesso e tente o login novamente dentro de 48 horas',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    }
  }

  loginInput(evento) {
    if (evento.key === 'Enter') {
      this.confirmarLogin();
    }
  }

  formataCpf() {
    if (this.user.cpf !== '' && this.user.cpf !== null) {
      if(this.user.cpf.length <= 11){
        this.user.cpf = formatarCPF(this.user.cpf);
      }
    }
  }
}

