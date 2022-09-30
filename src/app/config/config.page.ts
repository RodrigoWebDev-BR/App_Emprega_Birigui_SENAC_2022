import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  curriculo(){
    this.nav.navigateRoot('curriculo');
  }

  home(){
    this.nav.navigateRoot('home');
  }
}
