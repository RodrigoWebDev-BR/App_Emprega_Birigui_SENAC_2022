/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  candidato = {cpf : '' , senha : ''};

  constructor( public route : Router, public menuLeft: MenuController )
  { 
    this.menuLeft.enable(false);
  }

  confirmarLogin(){
    this.route.navigate(['home']);
  }

  cadastro(){
    this.route.navigate(['usuario']);
  }

  recuperacao(){
    this.route.navigate(['recuperacao']);
  }


  ngOnInit() {
  }
}
