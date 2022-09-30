/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-underscore-dangle */
import { EmpresaService } from './../servicos/empresa.service';
import {
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.page.html',
  styleUrls: ['./lista-empresas.page.scss'],
})
export class ListaEmpresasPage implements OnInit {
  itemAux: any = [];
  pendente: boolean = false;
  confirmada: boolean = false;
  // eslint-disable-next-line max-len
  constructor(
    public mensagem: AlertController,
    public toast: ToastController,
    public servicoEmpresa: EmpresaService,
    public nav: NavController
  ) {}

  async aceitar(empresa) {
    const num1 = this.geraAleatorio();
    const num2 = this.geraAleatorio();
    const result = num1 + num2;
    const aceitar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'A soma de ' + num1 + ' + ' + num2 + ' é igual a:',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (r1) => {
            if (r1[0].toString() !== result.toString()) {
              this.exibeToast('Incorreto', 'warning');
            } else {
              const doc = {
                aceita: true,
                recusada: false,
              };
              this.servicoEmpresa
                .patchEmpresa(doc, '', empresa._id)
                .then((e1) => {
                  if (e1 === undefined) {
                    this.exibeToast(
                      'Não foi possível aceitar a empresa',
                      'warning'
                    );
                  } else {
                    this.loadEmpresas();
                  }
                })
                .catch((e) => {
                  this.exibeToast('Erro com o servidor', 'danger');
                });
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Resultado',
          attributes: {
            maxlength: 3,
          },
          type: 'text',
        },
      ],
    });

    await aceitar.present();
  }

  async rejeitar(empresa) {
    const num1 = this.geraAleatorio();
    const num2 = this.geraAleatorio();
    const result = num1 + num2;
    const rejeitar = await this.mensagem.create({
      header: 'CAPTCHA',
      message: 'A soma de ' + num1 + ' + ' + num2 + ' é igual a:',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: (r2) => {
            if (r2[0].toString() !== result.toString()) {
              this.exibeToast('Incorreto', 'warning');
            } else {
              const doc = {
                aceita: false,
                recusada: true,
              };
              this.servicoEmpresa
                .patchEmpresa(doc, '', empresa._id)
                .then((e1) => {
                  if (e1 === undefined) {
                    this.exibeToast(
                      'Não foi possível rejeitar a empresa',
                      'warning'
                    );
                  } else {
                    this.loadEmpresas();
                  }
                })
                .catch((e) => {
                  this.exibeToast('Erro com o servidor', 'danger');
                });
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Resultado',
          attributes: {
            maxlength: 3,
          },
          type: 'text',
        },
      ],
    });

    await rejeitar.present();
  }

  pendenteChk() {
    if (this.pendente) {
      this.pendente = false;
      this.loadEmpresas();
    } else {
      this.pendente = true;
      this.confirmada = false;
      this.reloadEmpresas(false);
    }
  }

  confirmaChk() {
    if (this.confirmada) {
      this.confirmada = false;
      this.loadEmpresas();
    } else {
      this.confirmada = true;
      this.pendente = false;
      this.reloadEmpresas(true);
    }
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

  home() {
    this.nav.navigateRoot('home');
  }

  ngOnInit() {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.servicoEmpresa
      .perfis()
      .then((e1) => {
        this.itemAux = e1;
        this.itemAux = this.itemAux.items;
      })
      .catch();
  }

  reloadEmpresas(v: boolean) {
    this.servicoEmpresa
      .perfis()
      .then((e1) => {
        this.itemAux = e1;
        this.itemAux = this.itemAux.items;
        if (v) {
          this.itemAux = this.itemAux.filter(
            (emp) => !emp.recusada && emp.aceita
          );
        } else {
          this.itemAux = this.itemAux.filter(
            (emp) => !emp.recusada && !emp.aceita
          );
        }
      })
      .catch();
  }

  geraAleatorio(): number {
    const aleatorio: number = Math.random() * (35 - 1) + 1;
    return parseInt(aleatorio.toString(), 10);
  }
}
