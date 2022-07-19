import { MenuController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  candidato = {cpf : '' , senha : ''};

  confirmarLogin(){
    console.log(this.candidato);
    this.rota.navigate(['home']);
  }

  constructor( public rota : Router, public leftMenu: MenuController  )
  { 
    this.leftMenu.enable(false);
  }

  ngOnInit() {
  }
}
