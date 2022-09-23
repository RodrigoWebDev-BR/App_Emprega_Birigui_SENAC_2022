import { EmpresaService } from './../servicos/empresa.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.page.html',
  styleUrls: ['./lista-empresas.page.scss'],
})
export class ListaEmpresasPage implements OnInit {

  itemAux: any = {};

  // eslint-disable-next-line max-len
  constructor(public mensagem: AlertController, public toast: ToastController, public servicoEmpresa: EmpresaService, public nav: NavController) {}

  async aceitar(empresa){
    const aceitar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Deseja aceitar a empresa ' + empresa.nomeEmpresa + '? \nEsta decisão é irreversível!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Aceitar',
          handler: (senha) => {
            if(senha[0] === ''){
              this.exibeToast('Necessário informar a senha.', 'warning');
            }else if(senha[0] !== '123456'){
              this.exibeToast('Senha incorreta', 'danger');
            }else{
              empresa.aceita = true;
              empresa.recusada = false;
              // this.empresas[this.empresas.indexOf(empresa)] = empresa;
              this.exibeToast('Empresa aceita!', 'success');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Senha',
          attributes: {
            maxlength: 50,
          },
          type: 'password'
        },
      ],
    });

    await aceitar.present();
  }

  async rejeitar(empresa){
    const rejeitar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Deseja rejeitar a empresa ' + empresa.nomeEmpresa + '? \nEsta decisão é irreversível!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Rejeitar',
          handler: (senha) => {
            if(senha[0] === ''){
              this.exibeToast('Necessário informar a senha.', 'warning');
            }else if(senha[0] !== '123456'){
              this.exibeToast('Senha incorreta', 'danger');
            }else{
              empresa.aceita = false;
              empresa.recusada = true;
              // this.empresas[this.empresas.indexOf(empresa)] = empresa;
              this.exibeToast('Empresa recusada!', 'success');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Senha',
          attributes: {
            maxlength: 50,
          },
          type: 'password'
        },
      ]
    });

    await rejeitar.present();
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

  home(){
    this.nav.navigateRoot('home');
  }

  ngOnInit() {
    this.servicoEmpresa.perfis()
    .then((e1)=>{
      this.itemAux = e1;
      console.log(e1)
    })
    .catch();
  }
}
