import { EmpresaService } from './../servicos/empresa.service';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conclusao-vaga',
  templateUrl: './conclusao-vaga.page.html',
  styleUrls: ['./conclusao-vaga.page.scss'],
})
export class ConclusaoVagaPage implements OnInit {

  constructor(public menuLeft: MenuController, public nav: NavController, public servicoEmpresa: EmpresaService) {
    this.menuLeft.enable(false);
  }

  ngOnInit() {
  }

  home(){
    this.nav.navigateRoot('home');
  }

}
