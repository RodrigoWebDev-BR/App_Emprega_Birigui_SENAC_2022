import { NavController, AlertController } from '@ionic/angular';
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

  constructor(public nav: NavController, public mensagem: AlertController) {}

  async candidatar() {
    const alerta = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja candidatar-se a vaga 1 ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Candidatar-se',
          handler: () => {
            this.mostrarConteudo = false;
            this.esconderConteudo = true;

            setTimeout(() => {
              this.nav.navigateForward('timeline-vaga');
            }, 5000);
          },
        },
      ],
    });
    await alerta.present();

    //return para cancelar a execução do método
    return;
  }

  voltar() {
    this.nav.navigateForward('inscricao-vaga');
  }

  ngOnInit() {}
}
