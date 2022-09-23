import { CursosService } from './../servicos/cursos.service';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  public curso = {
    nome: '',
    instituicaoEnsino: ''
  };

  public cursos: any[] = [];

  constructor(
    public mensagem: AlertController,
    public cursoSave: CursosService,
    public nav: NavController,
    public menuLeft: MenuController
  ) {
    this.menuLeft.enable(false);
    this.carregarDados();
  }

  async adicionarCurso() {
    if (this.curso.nome === '' || this.curso.nome === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Não é permitido adicionar um curso sem nome.',
        buttons: ['ok'],
        cssClass: 'cssAlerta',
      });

      await alerta.present();

      return;
    } else if (
      this.curso.instituicaoEnsino === '' ||
      this.curso.instituicaoEnsino === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Não é permitido um curso sem  Instituição de Ensino.',
        buttons: ['ok'],
        cssClass: 'cssAlerta',
      });

      await alerta.present();

      return;
    } else {
      const cursoCopy = JSON.parse(JSON.stringify(this.curso));

      this.cursos.push(cursoCopy);

      this.cursoSave.salvarCurso(
        this.curso.nome,
        this.curso.instituicaoEnsino
      );

      this.curso.nome = '';
      this.curso.instituicaoEnsino = '';
    }
  }

  profissa() {
    this.nav.back();
  }

  async proximaPagina() {
    if (this.cursos.length === 0) {
      const nextPage = await this.mensagem.create({
        header: 'Atenção',
        message: 'Deseja ir para a próxima página sem adicionar nenhum curso?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
          },
          {
            text: 'Sim',
            handler: () => {
              if (localStorage.getItem('editar') === 'true') {
                this.nav.navigateForward('revisao');
              } else {
                this.nav.navigateForward('idiomas');
              }
            },
          },
        ],
      });

      await nextPage.present();
    } else {
      if (localStorage.getItem('editar') === 'true') {
        this.nav.navigateForward('revisao');
      } else {
        this.nav.navigateForward('idiomas');
      }
    }
  }

  async removerCurso(cursoRemove) {
    const confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message:
        'Confima exclusão de ' +
        cursoRemove.nome +
        '? Essa ação é irreverssível.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            this.cursoSave.deletar(cursoRemove.nome);
            const index = this.cursos.indexOf(cursoRemove);
            this.cursos.splice(index, 1);
          },
        },
      ],
    });

    await confirmaRemover.present();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if (this.cursoSave.listar() !== undefined) {
      this.cursos = this.cursoSave.listar();
    }
  }
}
