import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-exp-profissional',
  templateUrl: './exp-profissional.page.html',
  styleUrls: ['./exp-profissional.page.scss'],
})
export class ExpProfissionalPage implements OnInit {

  public experiencias: any[] = [];

  experiencia = {empresa: null, cargo: null, descricao: null, admissao: null, demissao: null }

  constructor(public route: Router, public mensagem: AlertController, public leftMenu:MenuController) { 
    this.leftMenu.enable(false)
  }
  async addExperiencia() {

    if (this.experiencia.empresa === '' || this.experiencia.empresa === null) {
      //abrir o alert avisando que exitem campos vazios
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário informar a empresa',
          buttons: ['OK'],
        }
      );
      await alerta.present();
      return;
    }else if(this.experiencia.cargo === ''||this.experiencia.cargo === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário informar o cargo',
          buttons: ['OK'],
        }
      );
      await alerta.present();
      return;
    }else if(this.experiencia.descricao ===''||this.experiencia.descricao === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário informar uma descrição',
          buttons: ['OK'],
        }
      );
      await alerta.present();
      return;
    }else if(this.experiencia.admissao ===''||this.experiencia.admissao === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário informar a data de admissão',
          buttons: ['OK'],
        }
      );
      await alerta.present();
      return;
    }else if(this.experiencia.demissao ===''||this.experiencia.demissao === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário informar a data de demissão',
          buttons: ['OK'],
        }
      );
      await alerta.present();
      return;
    }else{
      const experienciaCopy = JSON.parse(JSON.stringify(this.experiencia))

    this.experiencias.push(experienciaCopy);

    console.log(this.experiencias)

    this.experiencia.empresa = '';
    this.experiencia.cargo = '';
    this.experiencia.descricao ='';
    this.experiencia.admissao ='';
    this.experiencia.demissao ='';

    Storage.remove({ key: 'empresa' });
    Storage.remove({ key: 'cargo' });
    Storage.remove({ key: 'descricao' });
    Storage.remove({ key: 'admissao' });
    Storage.remove({ key: 'demissao' })
    }
  }
  async delExperiencia(experienciasRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja realmente remover a experiência ' + experienciasRemove.cargo + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado')
          }

        },
        {
          text: 'Sim',
          handler: () => {
            const index = this.experiencias.indexOf(experienciasRemove);
            this.experiencias.splice(index, 1);
            console.log('Removido')
          }
        }
      ]
    });
    await confirmaRemover.present();
  };

  async cadastrar(){
    this.route.navigate(['home']);  
  }

  formacao(){
    this.route.navigate(['formacao-educacional'])
  }

  ngOnInit() {
  }

}
