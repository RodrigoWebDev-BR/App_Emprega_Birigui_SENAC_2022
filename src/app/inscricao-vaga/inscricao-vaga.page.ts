/* eslint-disable no-underscore-dangle */
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
  alt: any;
  idUser: string;
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
    this.idUser = localStorage.getItem('idUser');

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

          this.itemAux.items.forEach((element) => {
            let valida: boolean;
            element.candidaturas.forEach((element2) => {
              if (element2.userId === this.idUser) {
                valida = true;
              }
            });

            element.candidato = valida;
          });
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
