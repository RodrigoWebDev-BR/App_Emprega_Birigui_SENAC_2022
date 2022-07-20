import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  public contatos: any[] = [];

  contato = { id: '', contato: '' }

  tipoContato = [
    {id:'1', nome:'Celular'},
    {id:'2', nome:'Telefone'},
    {id:'3', nome:'LinkedIn'},
    {id:'4', nome:'Instagram'},
    {id:'5', nome:'Facebook'},
  ]

  constructor(public route: Router, public mensagem: AlertController, public menuLeft: MenuController) {
    this.menuLeft.enable(false);
  }

  endereco(){
    this.route.navigate(['endereco']);
  }

  async addContato() {

    if (this.contato.id === null ||  this.contato.id === '' || this.contato.contato === '' || this.contato.contato === null) {
      //abrir o alert avisando que exitem campos vazios
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira um Contato',
          message: 'Necessário preencher todos os campos',
          buttons: ['OK'],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;
    }
    else
    {
      const contatoCopy = JSON.parse(JSON.stringify(this.contato));

      this.contatos.push(contatoCopy);

      this.contato.contato = '';
      this.contato.id = '';

      Storage.remove({ key: 'contato' });
      Storage.remove({ key: 'id' });
    }
  }

  async confirmar(){

    if(this.contatos.length > 0)
    {
      this.route.navigate(['formacao-educacional']);
    }
    else
    {
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira um Contato',
          message: 'É necessário pelo menos um contato',
          buttons: ['OK']
        }
      );

      await alerta.present();

      return;
    }
  }  

  async removerContato(contatosRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO',
      message: 'Confirma a exclusão do contato ' + contatosRemove.contato + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('CANCELADO')
          }

        },
        {
          text: 'Sim',
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

