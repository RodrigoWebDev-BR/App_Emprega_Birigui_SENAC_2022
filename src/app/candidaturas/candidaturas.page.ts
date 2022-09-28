/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { EmpresaService } from './../servicos/empresa.service';
/* eslint-disable max-len */
import { EmpregadoService } from './../servicos/empregado.service';
import { VagasService } from './../servicos/vagas.service';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidaturas',
  templateUrl: './candidaturas.page.html',
  styleUrls: ['./candidaturas.page.scss'],
})
export class CandidaturasPage implements OnInit {
  isModalOpen = false;
  itemAux: any = [];
  user: any = [];
  idVaga: string;
  pendente: boolean = false;
  confirmada: boolean = false;
  constructor(
    public mensagem: AlertController,
    public nav: NavController,
    public servicoVagas: VagasService,
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService,
    public toast: ToastController
  ) {}

  abreModal(open: boolean, id: string) {
    this.isModalOpen = open;
    if (id !== '') {
      this.servicoEmpregado
        .perfilId(id)
        .then((e1) => {
          if (e1) {
            this.user = e1;
          } else {
            this.isModalOpen = false;
            this.exibeToast('Erro ao encontrar candidato', 'danger');
          }
        })
        .catch((e) => {
          this.isModalOpen = false;
          this.exibeToast('Erro ao encontrar candidato', 'danger');
        });
    }
  }

  async convidar(usuario) {
    const alerta = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Deseja convidar ' + usuario.nome + ' para a vaga?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Convidar',
          handler: () => {
            this.servicoVagas
              .searchSubDoc()
              .then((e1) => {
                const aux1: any = e1;
                // const aux2: any = aux1.filter(
                //   (a) => a.userId._id !== usuario._id
                // );
                let aux2: any = {};
                aux2 = aux1.filter((a) => a.userId._id === usuario._id);
                aux2[0].aprovado = true;
                this.servicoVagas
                  .putVaga(aux1)
                  .then((e2) => {
                    if (e2) {
                      this.loadCandidatos();
                    }
                  })
                  .catch((e)=>{
                    this.exibeToast('Erro com servidor', 'danger');
                  });
              })
              .catch((e)=>{
                this.exibeToast('Erro com servidor', 'danger');
              });

            this.servicoEmpregado
              .searchSubDocId('candidaturas', usuario._id)
              .then((e3) => {
                const aux3: any = e3;
                let aux4: any = {};
                aux4 = aux3.filter(
                  (a) => a.vagaId._id === localStorage.getItem('idVaga')
                );

                aux4[0].aprovado = true;
                this.servicoEmpregado
                  .putUserId(aux3, 'candidaturas', usuario._id)
                  .then((e4) => {
                    this.exibeToast('Candidato aceito!', 'success');
                  })
                  .catch((e)=>{
                    this.exibeToast('Erro com servidor', 'danger');
                  });
              })
              .catch((e)=>{
                this.exibeToast('Erro com servidor', 'danger');
              });
          },
        },
      ],
    });

    await alerta.present();
  }

  async rejeitar(usuario) {
    const alerta = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message:
        'Deseja rejeitar ' +
        usuario.nome +
        ' para a vaga? Este processo é irreversível',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Rejeitar',
          handler: () => {
            this.servicoVagas
              .searchSubDoc()
              .then((e1) => {
                const aux1: any = e1;
                const aux2: any = aux1.filter(
                  (a) => a.userId._id !== usuario._id
                );
                let aux3: any = {};
                aux3 = aux1.filter((a) => a.userId._id === usuario._id);
                aux3[0].recusado = true;
                this.servicoVagas
                  .putVaga(aux1)
                  .then((e2) => {
                    if (e2) {
                      this.loadCandidatos();
                    }
                  })
                  .catch((e)=>{
                    this.exibeToast('Erro com servidor', 'danger');
                  });
              })
              .catch((e)=>{
                this.exibeToast('Erro com servidor', 'danger');
              });

              this.servicoEmpregado
              .searchSubDocId('candidaturas', usuario._id)
              .then((e3) => {
                const aux3: any = e3;
                let aux4: any = {};
                aux4 = aux3.filter(
                  (a) => a.vagaId._id === localStorage.getItem('idVaga')
                );

                aux4[0].recusado = true;
                this.servicoEmpregado
                  .putUserId(aux3, 'candidaturas', usuario._id)
                  .then((e4) => {
                    this.exibeToast('Candidato recusado!', 'success');
                  })
                  .catch((e)=>{
                    this.exibeToast('Erro com servidor', 'danger');
                  });
              })
              .catch((e)=>{
                this.exibeToast('Erro com servidor', 'danger');
              });
          },
        },
      ],
    });

    await alerta.present();
  }

  ngOnInit() {
    this.idVaga = localStorage.getItem('idVaga');
    this.loadCandidatos();
  }

  loadCandidatos() {
    this.servicoVagas
      .searchSubDoc()
      .then((e1) => {
        this.itemAux = e1;
      })
      .catch();
  }

  reloadCandidatos(v: boolean) {
    this.servicoVagas.searchSubDoc().then((e1) => {
      this.itemAux = e1;
      if (v) {
        this.itemAux = this.itemAux.filter(
          (cand) => cand.aprovado && !cand.recusado
        );
      } else {
        this.itemAux = this.itemAux.filter(
          (cand) => !cand.aprovado && !cand.recusado
        );
      }
    });
  }

  async exibeToast(msg, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }

  home() {
    this.nav.back();
  }

  pendenteChk() {
    if (this.pendente) {
      this.pendente = false;
      this.loadCandidatos();
    } else {
      this.pendente = true;
      this.confirmada = false;
      this.reloadCandidatos(false);
    }
  }

  confirmaChk() {
    if (this.confirmada) {
      this.confirmada = false;
      this.loadCandidatos();
    } else {
      this.confirmada = true;
      this.pendente = false;
      this.reloadCandidatos(true);
    }
  }

  geraAleatorio(): number {
    const aleatorio: number = Math.random() * (35 - 1) + 1;
    return parseInt(aleatorio.toString(), 10);
  }
}
