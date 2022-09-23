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

  experiencia = {
    empresa: '',
    cargo: '',
    descricao: '',
    dtInicio: '',
    dtFinal: '',
  };

  constructor(
    public nav: NavController,
    public mensagem: AlertController,
    public leftMenu: MenuController,
    public exp: ExpProfissionalService
  ) {
    this.leftMenu.enable(false);
  }

  async addExperiencia() {
    if (this.experiencia.empresa === '' || this.experiencia.empresa === null) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher o nome da empresa.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (
      this.experiencia.cargo === '' ||
      this.experiencia.cargo === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher o cargo da empresa.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (
      this.experiencia.descricao === '' ||
      this.experiencia.descricao === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher a descrição.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (
      this.experiencia.dtInicio === '' ||
      this.experiencia.dtInicio === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher a data de admissão.',
        buttons: ['OK'],
      });
      await alerta.present();

      //return para cancelar a execução do método
      return;
    } else {

      if (
        this.experiencia.dtFinal === '' ||
        this.experiencia.dtFinal === null
      ) {
        this.experiencia.dtFinal = 'até Atualmente';
      } else {
        const [ano, mes, dia] = this.experiencia.dtFinal.split('-');

        this.experiencia.dtFinal = 'até ' + dia + '/' + mes + '/' + ano;
      }

      const experienciaCopy = JSON.parse(JSON.stringify(this.experiencia));
      this.experiencias.push(experienciaCopy);

      this.exp.salvarExp(
        this.experiencia.empresa,
        this.experiencia.cargo,
        this.experiencia.dtInicio,
        this.experiencia.dtFinal,
        this.checado,
        this.experiencia.descricao
      );

      this.checado = false;

      this.experiencia.empresa = '';
      this.experiencia.cargo = '';
      this.experiencia.descricao = '';
      this.experiencia.dtInicio = '';
      this.experiencia.dtFinal = '';
    }
  }

  async delExperiencia(experienciasRemove) {
    const confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO',
      message:
        'Confirma a exclusão da experiência ' + experienciasRemove.cargo + '?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.exp.deletar(experienciasRemove.cargo);
            const index = this.experiencias.indexOf(experienciasRemove);
            this.experiencias.splice(index, 1);
          },
        },
      ],
    });

    await confirmaRemover.present();
  }

  async confirmar() {
    if (this.experiencias.length === 0) {
      const confirma = await this.mensagem.create({
        header: 'ATENÇÃO',
        message:
          'Deseja continuar sem acrescentar nenhuma experiência profissional?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Sim',
            handler: () => {
              if (localStorage.getItem('editar') === 'true') {
                this.nav.navigateForward('revisao');
              } else {
                this.nav.navigateForward('cursos');
              }
            },
          },
        ],
      });

      await confirma.present();
    } else {
      if (localStorage.getItem('editar') === 'true') {
        this.nav.navigateForward('revisao');
      } else {
        this.nav.navigateForward('cursos');
      }
    }
  }

  empregado($event) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    $event.currentTarget.checked
      ? (this.checado = true)
      : (this.checado = false);

    if (this.checado) {
      this.experiencia.dtFinal = '';
    }
  }

  formEdu() {
    this.nav.back();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if (this.exp.listar() !== undefined) {
      this.experiencias = this.exp.listar();
    }
  }
}
