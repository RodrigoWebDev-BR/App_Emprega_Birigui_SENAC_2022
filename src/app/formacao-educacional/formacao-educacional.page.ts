import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-formacao-educacional',
  templateUrl: './formacao-educacional.page.html',
  styleUrls: ['./formacao-educacional.page.scss'],
})
export class FormacaoEducacionalPage implements OnInit {

  formacao = {};

  constructor(public mensagem: AlertController) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async adicionarFormacao() {

    const alerta = await this.mensagem.create(
      {
        header: "ATENÇÃO",
        subHeader: "",
        message: "Informações armazenadas com sucesso",
        buttons: ["OK"],
        cssClass: "cssAlerta"
      }
    );
    await alerta.present();
    console.log(this.formacao);
  }
  proximo() {
    console.log(this.formacao)
  }
}
