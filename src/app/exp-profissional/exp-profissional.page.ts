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
  public checado = false;

  experiencia = {empresa:'', cargo:'', descricao:'', admissao:'', demissao:'' }

  constructor(public route: Router, public mensagem: AlertController, public leftMenu: MenuController) { 
    this.leftMenu.enable(false);
  }

  async addExperiencia() {

    if(this.experiencia.empresa === '' || this.experiencia.empresa === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário preencher o nome da empresa.',
          buttons: ['OK'],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;

    }else if(this.experiencia.cargo === '' || this.experiencia.cargo === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário preencher o cargo da empresa.',
          buttons: ['OK'],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;
    }else if(this.experiencia.descricao === '' || this.experiencia.descricao === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário preencher a descrição com pelo 70 palavras.',
          buttons: ['OK'],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;
    }else if(this.experiencia.admissao === '' || this.experiencia.admissao === null){
      const alerta = await this.mensagem.create(
        {
          header: 'Atenção',
          subHeader: 'Insira uma experiencia',
          message: 'Necessário preencher a data de admissão.',
          buttons: ['OK'],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;

    }else{
      
      if(this.experiencia.demissao === '' || this.experiencia.demissao === null)
      {
        this.experiencia.demissao = 'até Atualmente';
      }
      else
      {
        const [ano, mes, dia] = this.experiencia.demissao.split('-');
  
        this.experiencia.demissao = 'até ' + dia + '/' + mes + '/' + ano;
      }

      this.checado = false;

      const experienciaCopy = JSON.parse(JSON.stringify(this.experiencia))
  
      this.experiencias.push(experienciaCopy);
  
      this.experiencia.empresa = '';
      this.experiencia.cargo = '';
      this.experiencia.descricao ='';
      this.experiencia.admissao ='';
      this.experiencia.demissao ='';
  
      Storage.remove({ key: "empresa" });
      Storage.remove({ key: "cargo" });
      Storage.remove({ key: "descricao" });
      Storage.remove({ key: "admissao" });
      Storage.remove({ key: "demissao" }); 

    }
  }

  async delExperiencia(experienciasRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO',
      message: 'Confirma a exclusão da experiência ' + experienciasRemove.cargo + '?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            const index = this.experiencias.indexOf(experienciasRemove);
            this.experiencias.splice(index, 1);
          }
        }
      ]
    });

    await confirmaRemover.present();
  };

  async confirmar(){
    const confirma = await this.mensagem.create({
      header: 'ATENÇÃO',
      message: 'Deseja continuar sem acrescentar nenhuma experiência profissional?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            // console.log("CANCELADO")
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.route.navigate(['cursos']);
          }
        }
      ]
    });

    await confirma.present();
  }

  empregado($event){
    $event.currentTarget.checked ? this.checado = true : this.checado = false; 

    if(this.checado){
      this.experiencia.demissao = '';
    } 
  }

  formEdu(){
    this.route.navigate(['formacao-educacional']);
  }

  ngOnInit() {
  }

}
