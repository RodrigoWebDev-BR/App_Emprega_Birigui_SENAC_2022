import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.page.html',
  styleUrls: ['./idiomas.page.scss'],
})
export class IdiomasPage {

  public idioma = {id_idioma: '', nivel: '', descricao: ''};

  public idiomas: any [] = [];

  constructor(public mensagem: AlertController, public rota: Router) { }

  async adicionarIdioma() {

    if (this.idioma.id_idioma == '' || this.idioma.nivel == '') {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO",
          subHeader: "",
          message: "Não é permitido inserir um idioma com o campo vazio",
          buttons: ["OK"],
          cssClass: "cssAlerta"
        }
      );
      await alerta.present();

      return;
    }
    
    var idiomaCopy = JSON.parse(JSON.stringify(this.idioma))
    this.idiomas.push(idiomaCopy);

    console.log(this.idiomas)

    this.idioma.id_idioma = '';
    this.idioma.nivel = '';

  }
  async removerIdioma(idiomaRemove) 
  {
    let confirmaRemover = await this.mensagem.create(
    {
      header: "ATENÇÃO",
      message: "Confirma a exclusão do " + idiomaRemove.id_idioma + "?",
      buttons: 
      [
        {
          text: "Não",
          role: "cancel",
          handler: () => 
          {
            console.log("CANCELADO");
          }
        },
        {
          text: "Sim",
          handler: () => 

          {
            const index = this.idiomas.indexOf(idiomaRemove);

            this.idiomas.splice(index, 1);
          }
        }
      ],
    });
    await confirmaRemover.present();
  }
    proximo() {
    console.log(this.idioma);
    this.rota.navigate(['exp-profissional']);
  }
}
