import { ToastController, AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { VagasService } from './../servicos/vagas.service';
import { EmpregadoService } from './../servicos/empregado.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-vaga',
  templateUrl: './timeline-vaga.page.html',
  styleUrls: ['./timeline-vaga.page.scss'],
})
export class TimelineVagaPage implements OnInit {
  contato = { contato: '', id: '' };
  itemAux: any = {};
  contadorBenef = 0;
  aprovado: boolean;
  recusado: boolean;
  entrevista: string;
  item1: string;
  item2: string;
  item3: string;
  msgResult1: string = '';
  msgResult2: string = '';
  msgResult3: string = '';
  cor1: string = '';
  cor2: string = '';
  cor3: string = '';
  constructor(
    private nav: NavController,
    public servicoEmpregado: EmpregadoService,
    public servicoVaga: VagasService,
    public mensagem: AlertController
  ) {}

  ngOnInit() {
    this.servicoVaga
      .searchVaga()
      .then((e1) => {
        this.item1 = 'vermelho';
        this.itemAux = e1;
        this.contadorBenef = this.itemAux.beneficios.length;
        const aux = this.itemAux.candidaturas.filter(
          (a) => a.userId === localStorage.getItem('idUser')
        );
        this.aprovado = aux[0].aprovado;
        this.recusado = aux[0].recusado;
        this.entrevista = aux[0].entrevista;

        if (!this.aprovado && !this.recusado) {
          this.item1 = 'verde';
          this.item2 = 'amarelo';
          this.item3 = 'cinza';
          this.cor1 = 'success';
          this.cor2 = 'warning';
          this.msgResult1 = 'Inscrição realizada com sucesso';
          this.msgResult2 = 'Triagem de currículos em processo';
        } else if (!this.aprovado && this.recusado) {
          this.item1 = 'verde';
          this.item2 = 'vermelho';
          this.item3 = 'vermelho';
          this.cor1 = 'success';
          this.cor2 = 'danger';
          this.cor3 = 'danger';
          this.msgResult1 = 'Inscrição realizada com sucesso';
          this.msgResult2 = 'Currículo indeferido.';
          this.msgResult3 = 'Tente outra vaga!!!';
        } else if (this.aprovado && !this.recusado) {
          this.item1 = 'verde';
          this.item2 = 'verde';
          this.cor1 = 'success';
          this.cor2 = 'success';
          this.msgResult1 = 'Inscrição realizada com sucesso';
          this.msgResult2 = 'Currículo aprovado.';
          if (this.entrevista === 'aprovado') {
            this.item3 = 'verde';
            this.cor3 = 'success';
            this.msgResult3 = 'Convidado para entrevista!!!';
            this.msgSucesso(this.itemAux.msgEntrevista);
          } else if (this.entrevista === 'recusado') {
            this.item3 = 'vermelho';
            this.cor3 = 'danger';
            this.msgResult3 = 'Candidatura reprovada.';
          } else {
            this.item3 = 'amarelo';
            this.cor3 = 'warning';
            this.msgResult3 = 'Candidatura em análise!';
          }
        }
      })
      .catch();
  }

  home() {
    this.nav.navigateRoot('home');
  }

  async msgSucesso(msg: string) {
    const alerta = await this.mensagem.create({
      header: 'Parabéns!!!',
      message: msg,
      buttons: ['ok'],
    });

    await alerta.present();

    return;
  }
}
