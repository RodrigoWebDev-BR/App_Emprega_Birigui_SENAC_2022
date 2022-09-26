import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { IdiomasService } from '../servicos/idiomas.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.page.html',
  styleUrls: ['./idiomas.page.scss'],
})
export class IdiomasPage {

  public idioma = { idioma: '', nivel: '', bandeira: '' };
  public idiomas: any[] = [];

  tipoIdioma = [

    { id: '1', nome: 'Inglês' },
    { id: '2', nome: 'Espanhol' },
    { id: '3', nome: 'Japonês' },
    { id: '4', nome: 'Frânces' },
    { id: '5', nome: 'Italiano' },
    { id: '6', nome: 'Alemão' }

  ]

  constructor(public mensagem: AlertController, public nav: NavController, public leftMenu: MenuController, public idiomaServ: IdiomasService) {
    this.leftMenu.enable(false);
  }

  curso() {
    this.nav.back();
  }

  async adicionarIdioma() {

    if (this.idioma.idioma === '' || this.idioma.idioma === null) {
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
    else if (this.idioma.nivel === '' || this.idioma.nivel === null) {
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
    else if (this.idiomaServ.redundante(this.idioma.idioma)) {
      this.idioma.bandeira = '/assets/bandeiras/';

      switch (this.idioma.idioma) {
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

      this.idiomaServ.salvarIdiomas(this.idioma.idioma, this.idioma.nivel, this.idioma.bandeira)

      this.idioma.idioma = '';
      this.idioma.nivel = '';
    } else {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Não é permitido inserir um idioma repetido.',
          buttons: ['OK']
        }
      );

      await alerta.present();

      return;
    }


  }

  async removerIdioma(idiomaRemove) {
    const confirmaRemover = await this.mensagem.create(
      {
        header: 'ATENÇÃO',
        message: 'Confirma a exclusão do ' + idiomaRemove.idioma + '?',
        buttons:
          [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text: 'Sim',
              handler: () => {
                this.idiomaServ.deletar(idiomaRemove.idioma)
                const index = this.idiomas.indexOf(idiomaRemove);
                this.idiomas.splice(index, 1);
              }
            }
          ],
      });
    await confirmaRemover.present();
  }

  proximo() {
    if(localStorage.getItem('editar') === 'true') {
      this.nav.navigateForward('revisao')
    }else{
    this.nav.navigateRoot('detalhes-usuario');
    }
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if (this.idiomaServ.listar() !== undefined) {
      this.idiomas = this.idiomaServ.listar();
    }
  }
}
