import { ExpProfissionalService } from './../servicos/exp-profissional.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-exp-profissional',
  templateUrl: './exp-profissional.page.html',
  styleUrls: ['./exp-profissional.page.scss'],
})
export class ExpProfissionalPage implements OnInit {

  public experiencias: any[] = [];
  public checado = false;

  experiencia = { empresa: '', cargo: '', descricao: '', admissao: '', demissao: '' }

  constructor(
    public nav: NavController,
    public mensagem: AlertController,
    public leftMenu: MenuController,
    public exp: ExpProfissionalService) {
    this.leftMenu.enable(false);
  }

  async addExperiencia() {

    if (this.experiencia.empresa === '' || this.experiencia.empresa === null) {
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

    } else if (this.experiencia.cargo === '' || this.experiencia.cargo === null) {
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
    } else if (this.experiencia.descricao === '' || this.experiencia.descricao === null) {
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
    } else if (this.experiencia.admissao === '' || this.experiencia.admissao === null) {
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

    } else {

      if (this.experiencia.demissao === '' || this.experiencia.demissao === null) {
        this.experiencia.demissao = 'até Atualmente';
      }
      else {
        const [ano, mes, dia] = this.experiencia.demissao.split('-');

        this.experiencia.demissao = 'até ' + dia + '/' + mes + '/' + ano;
      }

      this.checado = false;
      
      const experienciaCopy = JSON.parse(JSON.stringify(this.experiencia))
      this.experiencias.push(experienciaCopy);

      // const [ano, mes, dia] = this.experiencia.admissao.split('-');

      // this.experiencia.admissao = dia + '/' + mes + '/' + ano;
      
      this.exp.salvarExp(
        this.experiencia.empresa,
        this.experiencia.cargo,
        this.experiencia.admissao,
        this.experiencia.demissao,
        this.experiencia.descricao,
        )
      

      this.experiencia.empresa = '';
      this.experiencia.cargo = '';
      this.experiencia.descricao = '';
      this.experiencia.admissao = '';
      this.experiencia.demissao = '';
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
            this.exp.deletar(experienciasRemove.cargo);
            const index = this.experiencias.indexOf(experienciasRemove);
            this.experiencias.splice(index, 1);
          }
        }
      ]
    });

    await confirmaRemover.present();
  };

  async confirmar() {
    if (this.experiencias.length === 0) {
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
              this.nav.navigateForward('cursos')
            }
          }
        ]
      });

      await confirma.present();
    } else {
      this.nav.navigateForward('cursos')
    }
  }

  empregado($event) {
    $event.currentTarget.checked ? this.checado = true : this.checado = false;

    if (this.checado) {
      this.experiencia.demissao = '';
    }
  }

  formEdu() {
    this.nav.back();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if(this.exp.listar() !== undefined){
      this.experiencias = this.exp.listar();
    }
  }

}
