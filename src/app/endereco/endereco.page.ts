import { CepService } from './../servicos/cep.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage {

  public bairroApi: string;
  public enderecoApi: string;
  public cidadeApi: string;
  public estadoApi: string;
  public estado = { id: '', nome: '', uf: '' }

  enderecoCEP: any = {};
  endereco = { endereco: '', numero: '', complemento: '', bairro: '', cep: '', cidade: '', estado: '' };

  constructor(
    public mensagem: AlertController,
    public nav: NavController,
    public menuLeft: MenuController,
    private cep: CepService) {
    this.menuLeft.enable(false);
  }

  ngOnInit() {
    this.CarregaDados();
  }

  usuario() {
    this.nav.back();
  }

  async confirmar() {

    if (this.endereco.endereco === '' || this.endereco.numero === '' || this.endereco.bairro === ''
      || this.endereco.cep === '' || this.endereco.cidade === '' || this.endereco.estado === '') {

      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Não é permitido cadastrar endereço com os campos vazios',
          buttons: ['OK'],
          cssClass: 'cssAlerta'
        }
      );

      await alerta.present();

      return;
    }

    this.salvarTemporariamente();
    this.nav.navigateForward('contato');

  }

  searchCEP(evento) {

    const cepDig = evento.detail.value;

    if (cepDig.length > 8) {
      
      if(cepDig.includes('-')){
       cepDig.replace('-', '');
      }

      this.cep.localizaCEP(cepDig)
        .then(response => {
          this.enderecoCEP = response;

          if (this.enderecoCEP === undefined) {
            return;
          }
          else {
            this.bairroApi = this.enderecoCEP.bairro;
            this.enderecoApi = this.enderecoCEP.logradouro;
            this.cidadeApi = this.enderecoCEP.localidade;
            this.estadoApi = this.enderecoCEP.uf;
          }
        })
        .catch()
    }
  }

  salvarTemporariamente() {
    console.log(this.endereco.endereco)
    localStorage.setItem('endereco', this.endereco.endereco)
    console.log(localStorage.getItem('endereco'))
    localStorage.setItem('cep', this.endereco.cep)
    localStorage.setItem('bairro', this.endereco.bairro)
    localStorage.setItem('cidade', this.endereco.cidade)
    localStorage.setItem('complemento', this.endereco.complemento)
    localStorage.setItem('numero', this.endereco.numero)
    localStorage.setItem('estado', this.endereco.estado)
  }

  CarregaDados() {
    this.endereco.endereco = localStorage.getItem('endereco')
    this.endereco.cep = localStorage.getItem('cep')
    this.endereco.bairro = localStorage.getItem('bairro')
    this.endereco.cidade = localStorage.getItem('cidade')

    if (localStorage.getItem('complemento') === null) {
      this.endereco.complemento = ''
    } else {
      this.endereco.complemento = localStorage.getItem('complemento')
    }

    this.endereco.numero = localStorage.getItem('numero')
    this.endereco.estado = localStorage.getItem('estado')
  }

}
