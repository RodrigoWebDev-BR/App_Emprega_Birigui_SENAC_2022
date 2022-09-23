import { VagasService } from './../servicos/vagas.service';
import { EmpresaService } from './../servicos/empresa.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscricao-vaga',
  templateUrl: './inscricao-vaga.page.html',
  styleUrls: ['./inscricao-vaga.page.scss'],
})
export class InscricaoVagaPage implements OnInit {
  quantidade = 0;
  itemAux: any = {};

  constructor(
    public nav: NavController,
    public servicoEmpresa: EmpresaService,
    public servicoVagas: VagasService
  ) {}

  detalhes(id: string, idEmp: string) {
    localStorage.setItem('idVaga', id);
    localStorage.setItem('idEmp', idEmp);
    this.nav.navigateForward('vaga-detalhes');
  }

  ngOnInit() {
    this.servicoVagas
      .searchVagas()
      .then((resp) => {
        this.itemAux = resp;
        if (this.itemAux !== undefined) {
          const congeline = this.itemAux.items.filter(
            (vagas) => vagas.online && !vagas.congelada
          );
          this.itemAux.items = congeline;
          if (this.itemAux.items !== undefined) {
            if (this.itemAux.items.length > 0) {
              this.quantidade = this.itemAux.items.length;
            }
          }
        }
      })
      .catch();
  }

  home() {
    this.nav.navigateRoot('home');
  }

  curriculo() {
    this.nav.navigateRoot('curriculo');
  }

  notifi() {
    this.nav.navigateRoot('notificacao');
  }
}
