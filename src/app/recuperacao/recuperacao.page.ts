import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.page.html',
  styleUrls: ['./recuperacao.page.scss'],
})
export class RecuperacaoPage implements OnInit {

  email = {email : ''};

  constructor(public nav:NavController ,public menuLeft: MenuController) 
  { this.menuLeft.enable(false) }

  login(){
    this.nav.navigateRoot(['login/login']);
  }

  recuperacao(){
    this.nav.navigateRoot(['login/login']);
  }

  ngOnInit() {
  }

}
