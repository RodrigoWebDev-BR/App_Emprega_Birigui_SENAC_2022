import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.page.html',
  styleUrls: ['./recuperacao.page.scss'],
})
export class RecuperacaoPage implements OnInit {

  email = {email : ''};

  constructor(public route: Router ,public menuLeft: MenuController) 
  { this.menuLeft.enable(false) }

  login(){
    this.route.navigate(['login']);
  }

  recuperacao(){
    this.route.navigate(['login']);
  }

  ngOnInit() {
  }

}
