import { EmpregadoService } from './../servicos/empregado.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  itemAux: any = [];
  constructor(public nav: NavController, public servicoEmpregado: EmpregadoService) { }

  ngOnInit() {
    this.loadEmpregados();
  }

  home(){
    this.nav.navigateRoot('home');
  }

  loadEmpregados() {
    this.servicoEmpregado
      .perfis()
      .then((e1) => {
        this.itemAux = e1;
        this.itemAux = this.itemAux.items;
      })
      .catch();
  }

}
