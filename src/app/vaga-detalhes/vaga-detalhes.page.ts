import { VagasService } from './../servicos/vagas.service';
import { LoginService } from './../servicos/login.service';
import { EmpregadoService } from './../servicos/empregado.service';
import { EmpresaService } from './../servicos/empresa.service';
import { validaCPF, formatarCPF } from './../../environments/functions';
import {
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaga-detalhes',
  templateUrl: './vaga-detalhes.page.html',
  styleUrls: ['./vaga-detalhes.page.scss'],
})
export class VagaDetalhesPage implements OnInit {
  public cpf;
  router: any;
  esconderConteudo = false;
  mostrarConteudo = true;
  itemAux: any = {};
  itemAux2: any = {};
  perfil: any = {};
  resp: any = {};

  public candidatura = {
    dtCandidatura: this.formatDate(new Date()).toString(),
    aprovado: false,
    recusado: false,
    entrevista: 'null',
    userId: localStorage.getItem('idUser'),
    empresaId: '',
  };
  // eslint-disable-next-line max-len
  constructor(
    public nav: NavController,
    public mensagem: AlertController,
    public toast: ToastController,
    public servicoEmpresa: EmpresaService,
    public servicoEmpregado: EmpregadoService,
    public authorize: LoginService,
    public servicoVaga: VagasService
  ) {}

  async candidatar() {
    const alerta = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja realmente se candidatar para esta vaga?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Candidatar-se',
          handler: () => {
            this.servicoVaga
            .searchSubDoc()
            .then((resp) => {
              this.itemAux2 = resp;
              if (this.itemAux === undefined) {
                return;
              } else {
                const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux2));
                const vagaAtual = {
                  dtCandidatura: this.formatDate(new Date()).toString(),
                  aprovado: false,
                  recusado: false,
                  entrevista: 'null',
                  userId: localStorage.getItem('idUser'),
                  empresaId: localStorage.getItem('idEmp')
                };
                colecao.push(vagaAtual);
                this.servicoVaga
                  .putVaga(colecao)
                  .then((respFinal) => {
                    if (!respFinal) {
                      return;
                    } else {
                      this.mostrarConteudo = false;
                      this.esconderConteudo = true;
                      setTimeout(() => {
                        this.nav.navigateForward('timeline-vaga');
                      }, 2000);
                    }
                  })
                  .catch();
              }
            })
            .catch();
            this.servicoEmpregado
            .searchSubDoc('candidaturas')
            .then((resp) => {
              this.itemAux2 = resp;
              if (this.itemAux === undefined) {
                return;
              } else {
                const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux2));
                const vagaAtual = {
                  dtCandidatura: this.formatDate(new Date()).toString(),
                  aprovado: false,
                  recusado: false,
                  entrevista: 'null',
                  vagaId: localStorage.getItem('idVaga')
                };
                colecao.push(vagaAtual);
                this.servicoEmpregado
                  .putUser(colecao, 'candidaturas')
                  .then((respFinal) => {
                    if (!respFinal) {
                      return;
                    } else {
                      this.mostrarConteudo = false;
                      this.esconderConteudo = true;
                      localStorage.removeItem('idEmp');
                      setTimeout(() => {
                        this.nav.navigateForward('timeline-vaga');
                      }, 2000);
                    }
                  })
                  .catch();
              }
            })
            .catch();
          },
        },
      ]
    });
    await alerta.present();

    return;
  }

  async exibeToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: 'warning',
    });

    toast.present();
  }

  voltar() {
    localStorage.removeItem('idVaga');
    this.nav.navigateForward('inscricao-vaga');
  }

  ngOnInit() {
    this.servicoVaga
      .searchVaga()
      .then((resp) => {
        this.itemAux = resp;

        if (this.itemAux !== undefined) {
        }
      })
      .catch();
    this.perfilEmpregado();
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  perfilEmpregado() {
    this.servicoEmpregado
      .perfil()
      .then((response) => {
        this.perfil = response;
        if (this.perfil === undefined) {
          this.exibeToast('Perfil com erro!');
        } else {
          localStorage.setItem('cpf', this.perfil.cpf);
        }
      })
      .catch();
  }
}
