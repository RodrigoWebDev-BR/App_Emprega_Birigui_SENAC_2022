import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.page.html',
  styleUrls: ['./idiomas.page.scss'],
})
export class IdiomasPage {

  public idioma = {id_idioma: '', nivel: '', descricao: '', bandeira: ''};
  public idiomas: any [] = [];
  
  tipoIdioma = [

    {id: '1', nome: 'Inglês'},
    {id: '2', nome: 'Espanhol'},
    {id: '3', nome: 'Japonês'},
    {id: '4', nome: 'Frânces'},
    {id: '5', nome: 'Italiano'},
    {id: '6', nome: 'Alemão'}

  ]

  constructor(public mensagem: AlertController, public route: Router, public leftMenu: MenuController) {
    this.leftMenu.enable(false);
   }

  curso(){
    this.route.navigate(['cursos']);
  }

  async adicionarIdioma() {

    console.log(this.idioma.nivel);

    if (this.idioma.id_idioma === '' || this.idioma.id_idioma === null) 
    {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Não é permitido inserir um idioma sem a linguagem.',
          buttons: ['OK']
        }
      );
      await alerta.present();

      return;

    }
    else if(this.idioma.nivel === '' || this.idioma.nivel === null)
    {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Não é permitido inserir um idioma sem o nível de conhecimento.',
          buttons: ['OK']
        }
      );

      await alerta.present();

      return;
    }
    else
    {
      this.idioma.bandeira = '/assets/bandeiras/';
     
      switch (this.idioma.id_idioma) 
      {
       case 'Inglês':
         this.idioma.bandeira += 'ingles.jpg';
         break;

       case 'Espanhol':
         this.idioma.bandeira += 'espanhol.png';
         break;

       case 'Japonês':
         this.idioma.bandeira += 'japones.png';
         break;

       case 'Frânces':
         this.idioma.bandeira += 'frances.png';
         break;

       case 'Italiano':
         this.idioma.bandeira += 'italiano.png';
         break;
      
       default:
         this.idioma.bandeira += 'alemao.png';
         break;
      }

      const idiomaCopy = JSON.parse(JSON.stringify(this.idioma))
      this.idiomas.push(idiomaCopy);

      this.idioma.id_idioma = '';
      this.idioma.nivel = '';
    }


  }

  async removerIdioma(idiomaRemove) 
  {
    let confirmaRemover = await this.mensagem.create(
    {
      header: 'ATENÇÃO',
      message: 'Confirma a exclusão do ' + idiomaRemove.id_idioma + '?',
      buttons: 
      [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => 
          {
            console.log('CANCELADO');
          }
        },
        {
          text: 'Sim',
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
    this.route.navigate(['conclusao']);
  }
}
