import { NavController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  candidato = {cpf : '' , senha : ''};

  constructor( public nav:NavController, public menuLeft: MenuController )
  { 
    this.menuLeft.enable(false);
  }

  confirmarLogin(){
    this.nav.navigateRoot('home');
  }

  cadastro(){
    this.nav.navigateForward('usuario');
  }

  recuperacao(){
    this.nav.navigateForward('recuperacao');
  }


  ngOnInit() {
  }
}
