import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-exp-profissional',
  templateUrl: './exp-profissional.page.html',
  styleUrls: ['./exp-profissional.page.scss'],
})
export class ExpProfissionalPage implements OnInit {

  public experiencias: any[] = [];

  experiencia = {empresa:'', cargo:'', descricao:'', admissao:'', demissao:'' }

  constructor(public rota: Router, public mensagem: AlertController) { 

  }
  async addExperiencia() {

    if (this.experiencia.empresa == '' || this.experiencia.cargo == ''||this.experiencia.descricao ==''||this.experiencia.admissao==''||this.experiencia.demissao =='' ) {
      //abrir o alert avisando que exitem campos vazios
      const alerta = await this.mensagem.create(
        {
          header: "Atenção",
          subHeader: "Insira uma experiencia",
          message: "Não é permitido adicionar um item vazio.",
          buttons: ["OK"],
        }
      );
      await alerta.present();

      //return para cancelar a execução do método
      return;
    }
    var experienciaCopy = JSON.parse(JSON.stringify(this.experiencia))

    this.experiencias.push(experienciaCopy);

    console.log(this.experiencias)

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
  async delExperiencia(experienciasRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: "ATENÇÃO",
      message: "Confirma a exclusão da experiência " + experienciasRemove.cargo + " ?",
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
            const index = this.experiencias.indexOf(experienciasRemove);
            this.experiencias.splice(index, 1);
          }
        }
      ]
    });
    await confirmaRemover.present();
  };

  cadastrar(){
    this.rota.navigate(['home']);
  }

  ngOnInit() {
  }

}
