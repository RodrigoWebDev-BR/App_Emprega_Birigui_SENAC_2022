/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  candidato = {cpf : '' , senha : ''};

<<<<<<< Updated upstream
  constructor( public nav: NavController, public menuLeft: MenuController )
  { 
    this.menuLeft.enable(false);
=======
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
          localStorage.setItem('nome', this.resp.nome);
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
>>>>>>> Stashed changes
  }

  confirmarLogin(){
    this.nav.navigateRoot('home')
  }

  cadastro(){
    this.nav.navigateForward('usuario')
  }

<<<<<<< Updated upstream
  recuperacao(){
    this.nav.navigateForward('recuperacao')
=======
  async ngOnInit() {
    if (localStorage.getItem('loginAuto') === 'true') {
      this.user.cpf = localStorage.getItem('CPF/CNPJ');
    }

    if (this.activated.snapshot.paramMap.get('id').includes('empregado_')) {
      const alerta = await this.mensagem.create({
        header: 'Seja Bem-Vindo!',
        message: this.activated.snapshot.paramMap.get('id').split('_')[1] + ' seu cadastro foi realizado com sucesso, faça seu login.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    } else if (this.activated.snapshot.paramMap.get('id').includes('empresa')) {
      const alerta = await this.mensagem.create({
        header: 'PRONTO!!!',
        message:
          'Olá ' + this.activated.snapshot.paramMap.get('id').split('_')[1] + ' seu cadastro foi realizado com sucesso. Aguarde a prefeitura de Birigui autorizar seu acesso e tente o login novamente dentro de 48 horas.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    }else if(this.activated.snapshot.paramMap.get('id').includes('erro')){
      const alerta = await this.mensagem.create({
        header: 'Ops...',
        message: 'Não foi possível completar seu cadastro por erros internos, tente o cadastro novamente, se o erro persistir, entre em contato com a prefeitura de Birigui.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    }
>>>>>>> Stashed changes
  }
  
  ngOnInit() {
  }
}
