import { VagasService } from './../servicos/vagas.service';
import { EmpresaService } from './../servicos/empresa.service';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conclusao-vaga',
  templateUrl: './conclusao-vaga.page.html',
  styleUrls: ['./conclusao-vaga.page.scss'],
})
export class ConclusaoVagaPage implements OnInit {
  itemAux: any = {};
  contadorBenef = 0;
  // eslint-disable-next-line max-len
  constructor(public menuLeft: MenuController, public nav: NavController, public servicoEmpresa: EmpresaService, public servicoVagas: VagasService) {
    // this.menuLeft.enable(false);
  }

  ngOnInit() {

    this.servicoVagas.searchVaga()
    .then((resp) =>{
      this.itemAux = resp;
      this.contadorBenef = this.itemAux.beneficios.length;
    })
    .catch();
  }

  home(){
    localStorage.removeItem('idVaga');
    this.nav.navigateRoot('home');
  }

}
