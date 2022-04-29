import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.page.html',
  styleUrls: ['./idiomas.page.scss'],
})
export class IdiomasPage {

  constructor(public  mensagem: AlertController) { 
}

async adicionarIdioma(){

  const alerta = await this.mensagem.create(
    {
      header: "ATENÇÃO",
      subHeader: "",
      message: "Idioma(s) armazenado(s) com sucesso",
      buttons: ["OK"],
      cssClass: "cssAlerta"
    }
  );
  await alerta.present();
}
}