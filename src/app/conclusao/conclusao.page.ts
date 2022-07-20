import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {

  constructor(public leftMenu: MenuController, public route: Router) 
  {
    this.leftMenu.enable(false);
  }

  ngOnInit() {

    setTimeout(() => {
      this.route.navigate(['login']);
  }, 10567); 

  }

}
