import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage {

  endereco = { endereco: '', numero: '', complemento: '', bairro: '', cep: '', cidade: '', estado: '', };

  constructor(public mensagem: AlertController, public rota: Router) {

  }

  async cadastrarEndereco() {

    const alerta = await this.mensagem.create(
      {
        header: "ATENÇÃO",
        subHeader: "",
        message: "Endereco armazenado com sucesso",
        buttons: ["OK"],
        cssClass: "cssAlerta"
      }
    );
    await alerta.present();
  }
  confirmar() {
    console.log(this.endereco);
    this.rota.navigate(['contato']);
  }
}
