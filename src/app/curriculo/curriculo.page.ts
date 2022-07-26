import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.page.html',
  styleUrls: ['./curriculo.page.scss'],
})
export class CurriculoPage implements OnInit {
  constructor(public leftMenu: MenuController) {
    this.leftMenu.enable(true);
  }

  ngOnInit() {}
}
