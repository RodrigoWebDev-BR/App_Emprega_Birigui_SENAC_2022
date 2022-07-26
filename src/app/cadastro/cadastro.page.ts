import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(
    public leftMenu: MenuController,
    public nav: NavController
  ) { 
    this.leftMenu.enable(false);
  }

  ngOnInit() {
  }

  login(){
    this.nav.navigateRoot('login')
  }

  usuario(){
    this.nav.navigateRoot('usuario')
  }

  empresa(){
    this.nav.navigateRoot('empresa')
  }

}
