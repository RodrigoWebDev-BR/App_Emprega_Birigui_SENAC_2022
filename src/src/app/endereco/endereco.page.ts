import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage {

  endereco = { endereco: '', numero: '', complemento: '', bairro: '', cep: '', cidade: '', estado: '', };

  public estado = {id: '', nome: '', uf: ''}

  estados = [
    {id:'1', nome:'ACRE', uf:'AC'},
    {id:'2', nome:'ALAGOAS', uf:'AL'},
    {id:'3', nome:'AMAPÁ', uf:'AP'},
    {id:'4', nome:'AMAZONAS', uf:'AM'},
    {id:'5', nome:'BAHIA', uf:'BA'},
    {id:'6', nome:'CEARÁ', uf:'CE'},
    {id:'7', nome:'ESPÍRITO SANTO', uf:'ES'},
    {id:'8', nome:'GOIÁS', uf:'GO'},
    {id:'9', nome:'MARANHÃO', uf:'MA'},
    {id:'10', nome:'MATO GROSSO', uf:'MT'},
    {id:'11', nome:'MATO GROSSO DO SUL', uf:'MS'},
    {id:'12', nome:'MINAS GERAIS', uf:'MG'},
    {id:'13', nome:'PARÁ', uf:'PA'},
    {id:'14', nome:'PARAÍBA', uf:'PB'},
    {id:'15', nome:'PARANÁ', uf:'PR'},
    {id:'16', nome:'PERNAMBUCO', uf:'PE'},
    {id:'17', nome:'PIAUÍ', uf:'PI'},
    {id:'18', nome:'RIO DE JANEIRO', uf:'RJ'},
    {id:'19', nome:'RIO GRANDE DO NORTE', uf:'RN'},
    {id:'20', nome:'RIO GRANDE DO SUL', uf:'RS'},
    {id:'21', nome:'RONDÔNIA', uf:'RO'},
    {id:'22', nome:'RORAIMA', uf:'RR'},
    {id:'23', nome:'SANTA CATARINA', uf:'SC'},
    {id:'24', nome:'SÃO PAULO', uf:'SP'},
    {id:'25', nome:'SERGIPE', uf:'SE'},
    {id:'26', nome:'TOCANTINS', uf:'TO'},
    {id:'27', nome:'DISTRITO FEDERAL', uf:'DF'}
  ]

  constructor(public mensagem: AlertController, public route: Router, public menuLeft: MenuController) {
    this.menuLeft.enable(false);
  }
  
  usuario(){
    this.route.navigate(['usuario'])
  }

  async confirmar() {

    if (this.endereco.endereco === '' || this.endereco.numero === '' || this.endereco.complemento === '' || this.endereco.bairro === ''
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
  
  this.route.navigate(['contato']);

}

}
