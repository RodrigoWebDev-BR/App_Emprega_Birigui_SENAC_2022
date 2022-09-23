import { VagasService } from './../servicos/vagas.service';
import { EmpresaService } from './../servicos/empresa.service';
import { EmpregadoService } from './../servicos/empregado.service';
import { validarCNPJ } from './../../environments/functions';
import {
  MenuController,
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  perfil: any = {};
  itemAux: any = {};
  itemAux2: any = {};
  itemAux3: any = [];
  empresa = false;
  empregado = false;
  none = false;

  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public mensagem: AlertController,
    public toast: ToastController,
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService,
    public servicoVagas: VagasService
  ) {
    this.menuLeft.enable(true);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async fecharVaga(emprego) {
    const finalizar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message:
        'Para finalizar as vagas de ' +
        emprego.tituloVaga +
        ' insira seu CNPJ. Esta ação é irreversível',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Finalizar',
          handler: (cnpj) => {
            if (validarCNPJ(cnpj[0])) {
              this.servicoEmpresa
                .perfil()
                .then((response) => {
                  this.perfil = response;
                  if (this.perfil !== undefined) {
                    if (cnpj[0] === this.perfil.cnpj) {
                      this.servicoVagas
                        // eslint-disable-next-line no-underscore-dangle
                        .patchVaga(false, 'closed', emprego._id)
                        .then((finalResp) => {
                          this.itemAux2 = finalResp;
                          if (this.itemAux2 === undefined) {
                            this.exibeToast(
                              'Erro para inserir a vaga!',
                              'danger'
                            );
                          } else {
                            this.exibeToast(
                              'Vaga finalizada com sucesso',
                              'primary'
                            );
                            this.perfilEmpresa();
                          }
                        })
                        .catch();
                    } else {
                      this.exibeToast('CNPJ inválido!', 'warning');
                    }
                  } else {
                    this.exibeToast('Erro com servidor!', 'danger');
                  }
                })
                .catch();
            } else {
              this.exibeToast('CNPJ inválido!', 'warning');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'CNPJ',
          attributes: {
            maxlength: 18,
          },
        },
      ],
    });

    await finalizar.present();
  }

  async exibeToast(msg, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }

  ngOnInit() {
    localStorage.removeItem('idVaga');

    if (
      localStorage.getItem('reload') === null ||
      localStorage.getItem('reload') === undefined
    ) {
      if (
        localStorage.getItem('profile') !== null ||
        localStorage.getItem('profile') !== undefined
      ) {
        if (!this.none) {
          if (localStorage.getItem('reload') !== 'true') {
            window.location.reload();
            localStorage.setItem('reload', 'true');
          }
        }
      }
    } else {
      this.none = true;
      if (localStorage.getItem('profile') === 'empresa') {
        this.perfilEmpresa();
      } else if (localStorage.getItem('profile') === 'empregado') {
        this.perfilEmpregado();
      }
    }
  }

  perfilEmpregado() {
    this.empregado = true;

    this.servicoEmpregado
      .perfil()
      .then((response) => {
        this.perfil = response;
        if (this.perfil === undefined) {
          this.exibeToast('Perfil com erro!', 'danger');
        }
      })
      .catch();

    this.servicoEmpregado.searchSubDoc('candidaturas')
    .then((e1) =>{
      this.itemAux3 = e1;
      console.log(this.itemAux3);
    })
    .catch();
  }

  perfilEmpresa() {
    this.empresa = true;
    this.servicoEmpresa
      .perfil()
      .then((response) => {
        this.perfil = response;
        if (this.perfil === undefined) {
          this.exibeToast('Perfil com erro!', 'danger');
        }
      })
      .catch();

    this.servicoVagas
      .searchVagas()
      .then((resp) => {
        this.itemAux = resp;
        if (this.itemAux !== undefined) {
        }
      })
      .catch();
  }

  congelar(id: string) {
    this.servicoVagas
      .patchVaga(true, 'temp', id)
      .then((resp) => {
        this.itemAux2 = resp;
        if (this.itemAux2 !== undefined) {
          this.exibeToast('Vaga congelada', 'tertiary');
          this.perfilEmpresa();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  descongelar(id: string) {
    this.servicoVagas
      .patchVaga(false, 'temp', id)
      .then((resp) => {
        this.itemAux2 = resp;
        if (this.itemAux2 !== undefined) {
          this.exibeToast('Vaga descongelada', 'secondary');
          this.perfilEmpresa();
        }
      })

      .catch((e) => {
        console.log(e);
      });
  }

  abrirVaga(id: string) {
    localStorage.setItem('idVaga', id);
    this.nav.navigateRoot('timeline-vaga');
  }

  candidatos(id: string) {
    localStorage.setItem('idVaga', id);
    this.nav.navigateRoot('candidaturas');
  }

  curriculo() {
    this.nav.navigateRoot('curriculo');
  }

  config() {
    this.nav.navigateRoot('config');
  }

  novaVaga() {
    this.nav.navigateRoot('lancamento-vaga');
  }

  vagas() {
    this.nav.navigateRoot('inscricao-vaga');
  }

  notifi() {
    this.nav.navigateRoot('notificacao');
  }
}
