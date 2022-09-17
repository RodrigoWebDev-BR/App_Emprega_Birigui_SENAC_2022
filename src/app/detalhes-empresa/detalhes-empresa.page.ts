import { NavController, MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-empresa',
  templateUrl: './detalhes-empresa.page.html',
  styleUrls: ['./detalhes-empresa.page.scss'],
})
export class DetalhesEmpresaPage implements OnInit {
 
  detalhes = {
    ramo: '',
    descricao: ''
  };

  caracter = 0;

  ramos = [
  { id: '1', nome: 'Alimentos' },
  { id: '2', nome: 'Entretenimento' },
  { id: '3', nome: 'Contabilidade' },
  { id: '4', nome: 'Escritório' },
  { id: '5', nome: 'Instituto educacional' },
  { id: '6', nome: 'Linha de produção' },
  { id: '7', nome: 'Moda' },
  { id: '8', nome: 'Postos de combustíveis' },
  { id: '9', nome: 'Rescursos Humanos' },
  { id: '10', nome: 'Supermercado' },
  { id: '11', nome: 'Tecnologia' },
  { id: '12', nome: 'Varejo' },
  { id: '13', nome: 'Outros' }

  ];

  constructor(
    public nav: NavController, 
    public leftMenu: MenuController, 
    public mensagem: AlertController
    ) { 
      this.leftMenu.enable(false);
    }

    contato(){
      this.nav.back();
    }

    contador(evento){
      if(evento.detail.value.length > 0){
        this.caracter = evento.detail.value.length;   
      }else{
        this.caracter = 0;
      }
    }

    contadorReload(descricao: string){
      if(descricao.length > 0) {
     this.caracter = descricao.length;   
     }else{
       this.caracter = 0;
      }
    }

    async conclusao(){
      if(this.detalhes.ramo === '' || this.detalhes.ramo === null){
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'Necessário informar o ramo empresarial.',
            buttons: ['ok'],
            cssClass: 'cssAlerta'
          });
  
        await alerta.present();
  
        return;
      }else if(this.detalhes.descricao === '' || this.detalhes.descricao === null){
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'Necessário informar uma descrição.',
            buttons: ['ok'],
            cssClass: 'cssAlerta'
          });
  
        await alerta.present();
  
        return;
      }else if(this.caracter < 100){
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'Descrição deve conter no mínimo 100 caracteres.',
            buttons: ['ok'],
            cssClass: 'cssAlerta'
          });
  
        await alerta.present();
  
        return;
      }else{
        this.salvarTemporariamente();
        this.nav.navigateRoot('revisao');
      } 
    }

    salvarTemporariamente(){
      localStorage.setItem('ramo', this.detalhes.ramo);
      localStorage.setItem('descricaoEmpresa', this.detalhes.descricao);
    }

    carregarDados(){
      this.detalhes.ramo = localStorage.getItem('ramo');
      this.detalhes.descricao =localStorage.getItem('descricaoEmpresa')
    }

  ngOnInit() {
    this.carregarDados();
    console.log(this.detalhes.descricao);
    if(this.detalhes.descricao !== null){
      this.contadorReload(this.detalhes.descricao);

    }
  }
    
}
