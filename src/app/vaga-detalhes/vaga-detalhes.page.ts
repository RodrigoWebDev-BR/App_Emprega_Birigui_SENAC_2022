import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaga-detalhes',
  templateUrl: './vaga-detalhes.page.html',
  styleUrls: ['./vaga-detalhes.page.scss'],
})
export class VagaDetalhesPage implements OnInit {
  router: any;
  esconderConteudo = false;
  mostrarConteudo = true;

  constructor(public nav: NavController, public mensagem: AlertController, public toast: ToastController ) {}

  async candidatar() {
    const alerta = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja candidatar-se a vaga ? Necessário informar o CPF.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Candidatar-se',
          handler: (cpf) => {
            if (cpf[0] !== '') {
              this.mostrarConteudo = false;
              this.esconderConteudo = true;

              setTimeout(() => {
                this.nav.navigateForward('timeline-vaga');
              }, 5000);
            }else{
              this.exibeToast('CPF inválido');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'CPF',
          attributes: {
            maxlength: 15,
          },
        },
      ],
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
    this.nav.navigateForward('inscricao-vaga');
  }

  ngOnInit() {}
}
