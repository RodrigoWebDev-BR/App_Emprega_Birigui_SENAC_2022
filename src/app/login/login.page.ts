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
    private authorize: LoginService,
    public mensagem: AlertController
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
      this.authorize
        .login(this.user.cpf, this.user.password)
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

  ngOnInit() {
    if (localStorage.getItem('loginAuto') === 'true') {
      this.user.cpf = localStorage.getItem('CPF/CNPJ');
    }
  }

  loginInput(evento) {
    if (evento.key === 'Enter') {
      this.confirmarLogin();
    }
  }

  formatarCpf() {
    let aocpf = this.user.cpf;
    aocpf = aocpf.replace(/(\d{3})(\d)/, '$1.$2');
    aocpf = aocpf.replace(/(\d{3})(\d)/, '$1.$2');
    aocpf = aocpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.user.cpf = aocpf;
  }
}
