import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { FormEducacionalService } from '../servicos/form-educacional.service';

@Component({
  selector: 'app-formacao-educacional',
  templateUrl: './formacao-educacional.page.html',
  styleUrls: ['./formacao-educacional.page.scss'],
})
export class FormacaoEducacionalPage implements OnInit {

  public formEducacional: any[] = [];

  formacao = {instituicao: null, nomeCurso: null, nivel: null, conclusao: null};

  formacoes = [
    {id: '1', nivel: '2º Grau Médio'},
    {id: '2', nivel: 'Técnologo'},
    {id: '3', nivel: 'Ensino Superior'},
    {id: '4', nivel: 'Pós Graduação'},
    {id: '5', nivel: 'Mestrado'},
    {id: '6', nivel: 'Doutorado'},
    {id: '7', nivel: 'Outros'},
  ];

  conclusoes = [
    {id:'I', resp:'Incompleto'},
    {id:'A', resp:'Em andamento'},
    {id:'C', resp:'Concluído'}
  ];

  constructor(public mensagem: AlertController, public nav: NavController, public leftMenu: MenuController, public formServ:FormEducacionalService) {
    this.leftMenu.enable(false);
  }

  ngOnInit() {
    this.carregarDados();
  }

  async adicionar() {

    if(this.formacao.instituicao === null || this.formacao.instituicao === '')
    {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Necessário informar a instituição',
          buttons: ['OK'],
          cssClass: 'cssAlerta'
        }
      );
      await alerta.present();

      return;
    }
    else if(this.formacao.nivel === null || this.formacao.nivel === '')
    {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Necessário informar sua formação',
          buttons: ['OK'],
          cssClass: 'cssAlerta'
        }
      );
      await alerta.present();

      return;
    }
    else if(this.formacao.conclusao === null || this.formacao.conclusao === '')
    {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'Necessário informar a conclusão do curso',
          buttons: ['OK'],
          cssClass: 'cssAlerta'
        }
      );
      await alerta.present();

      return;
    }
    else
    {
      const formCopy = JSON.parse(JSON.stringify(this.formacao));
      console.log(formCopy)
      this.formEducacional.push(formCopy);

      this.formServ.salvarForm(this.formacao.instituicao, this.formacao.nomeCurso, this.formacao.conclusao, this.formacao.nivel )

      this.formacao.instituicao = '';
      this.formacao.nomeCurso = '';
      this.formacao.conclusao = '';
      this.formacao.nivel = '';

    }
  }

  async confimar(){
    
    if(this.formEducacional.length > 0)
    {
      this.nav.navigateForward(['exp-profissional']);
    }
    else
    {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          subHeader: '',
          message: 'É necessário pelo menos uma formação',
          buttons: ['OK']
        }
      );
      await alerta.present();

      return;
    }
  }

  async removeForms(instDelete){
    const confirmarRemocao = await this.mensagem.create({
      header: 'Atenção',
      message: 'Deseja realmente remover a formação em ' + instDelete.instituicao + '?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('CANCELADO');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.formServ.deletar(instDelete.instituicao)

            const index = this.formEducacional.indexOf(instDelete);
            this.formEducacional.splice(index, 1);
            console.log('REMOVIDO');
          }
        }
      ]
    });

    await confirmarRemocao.present();
  }

  contato(){
    this.nav.back();
  }

  carregarDados(){

    if(this.formServ.listar() !== undefined){
      this.formEducacional = this.formServ.listar();
    }
  }

}
