/* eslint-disable max-len */
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  public master = {
    nome: 'Prefeitura de birigui',
    email: null,
    password: null,
    confirmacao: null
  };

  constructor(public nav: NavController, public mensagem: AlertController, public menuLeft: MenuController) {
    this.menuLeft.enable(false);
  }

  async ngOnInit() {

    localStorage.setItem('profile', 'user_master');

    const alerta = await this.mensagem.create({
      header: 'Bem Vindo!',
      message: 'Você é o primeiro a pisar por essas bandas. <br /> <br /> Você será o usuário principal de todo o sistema. Para prosseguir, informe alguns dados',
      buttons: ['ok'],
    });
    await alerta.present();

    return;
  }

  async finaliza() {
    if (this.master.nome === '' || this.master.nome === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o nome.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.master.email === '' || this.master.email === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o E-mail.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.master.password === '' || this.master.password === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar uma senha.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.master.password !== this.master.confirmacao) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'As senhas precisam coincidir uma com a outra.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      localStorage.setItem('nome', this.master.nome);
      localStorage.setItem('email', this.master.email);
      localStorage.setItem('password', this.master.password);
      localStorage.setItem('profile', 'user_master');

      this.nav.navigateRoot('conclusao');
    }
  }
}
