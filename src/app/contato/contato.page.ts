import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  public contatos: any[] = [];

  contato = { id_tipo_contato: '', contato: '' }

  constructor(public rota: Router, public mensagem: AlertController) {

  }

  /* async addContato(){
      console.log(this.contato)
      this.rota.navigate(['folder']);
  } */

  async addContato() {

    if (this.contato.id_tipo_contato == '' || this.contato.contato == '') {
      //abrir o alert avisando que exitem campos vazios
      const alerta = await this.mensagem.create(
        {
          header: "Atenção",
          subHeader: "Insira um Contato",
          message: "Não é permitido adicionar um item vazio.",
          buttons: ["OK"],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;
    }
    var contatoCopy = JSON.parse(JSON.stringify(this.contato))

    this.contatos.push(contatoCopy);

    console.log(this.contatos)

    this.contato.contato = '';
    this.contato.id_tipo_contato = '';

    Storage.remove({ key: "contato" });
    Storage.remove({ key: "id_tipo_contato" });

  }
  async removerContato(contatosRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: "ATENÇÃO",
      message: "Confirma a exclusão do contato " + contatosRemove.contato + " ?",
      buttons: [
        {
          text: "Não",
          role: "cancel",
          handler: () => {
            console.log("CANCELADO")
          }

        },
        {
          text: "Sim",
          handler: () => {
            const index = this.contatos.indexOf(contatosRemove);
            this.contatos.splice(index, 1);
          }
        }



      ]
    });
    await confirmaRemover.present();
  };

  ngOnInit() {
  }
}

