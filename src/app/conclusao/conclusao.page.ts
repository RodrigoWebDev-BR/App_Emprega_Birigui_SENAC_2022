import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {

  constructor(public leftMenu: MenuController, public nav: NavController) 
  {
    this.leftMenu.enable(false);
  }

  ngOnInit() {

    setTimeout(() => {
      if(localStorage.getItem('nome') === null || localStorage.getItem('nome') === undefined){
        this.nav.navigateRoot(['login/empresa']); 
      }else{
        this.nav.navigateRoot(['login/empregado']);
      }
  }, 10567); 

  }

}
