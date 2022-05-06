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
  
  async confirmar() {

    if (this.endereco.endereco == '' || this.endereco.numero == '' || this.endereco.complemento == '' || this.endereco.bairro == ''
    || this.endereco.cep == '' || this.endereco.cidade == '' || this.endereco.estado == '') {

    const alerta = await this.mensagem.create(
      {
        header: "ATENÇÃO",
        subHeader: "",
        message: "Não é permitido cadastrar endereço com os campos vazios",
        buttons: ["OK"],
        cssClass: "cssAlerta"
      }
    );
    console.log(this.endereco);
    await alerta.present();

    return;
  }
  this.rota.navigate(['contato']);

}

}
