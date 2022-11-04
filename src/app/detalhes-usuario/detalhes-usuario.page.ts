import { NavController, MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.page.html',
  styleUrls: ['./detalhes-usuario.page.scss'],
})
export class DetalhesUsuarioPage implements OnInit {

  detalhes = {
    descricao: ''
  };

  caracter = 0;

  constructor(
    public nav: NavController,
    public leftMenu: MenuController,
    public mensagem: AlertController
  ) {
    this.leftMenu.enable(false);
  }

  idioma(){
    this.nav.back();
  }

  contador(evento){
    if(evento.detail.value.length > 0){
      this.caracter = evento.detail.value.length;
    }else{
      this.caracter = 0;
    }
  }

  contatorReload(descricao: string){
    if(descricao.length > 0){
      this.caracter = descricao.length;
    }else{
      this.caracter = 0;
    }
  }

  async conclusao(){
    if(this.detalhes.descricao === '' || this.detalhes.descricao === null){
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário informar uma descrição.',
        buttons: ['ok'],
        cssClass: 'cssAlerta',
      });

      await alerta.present();

      return;
    }else if(this.caracter < 50){
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Descrição deve conter no mínimo 50 caracteres!',
        buttons: ['ok'],
        cssClass: 'cssAlerta',
      });

      await alerta.present();

      return;
    }else{
      this.salvarTemporariamente();
      this.nav.navigateRoot('revisao');
    }
  }

  salvarTemporariamente(){
    localStorage.setItem('descricao-usuario', this.detalhes.descricao);
  }

  carregarDados(){
    this.detalhes.descricao = localStorage.getItem('descricao-usuario');
  }

  ngOnInit() {
    this.carregarDados();
    if(this.detalhes.descricao !== null){
      this.contatorReload(this.detalhes.descricao);
    }
  }

}
