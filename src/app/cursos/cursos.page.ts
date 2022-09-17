import { CursosService } from './../servicos/cursos.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  public curso = {
    nome: '',
    instituicaoEnsino: '',
  };

  public cursos: any[] = [];

  constructor(
    public mensagem: AlertController,
    public nav: NavController,
    public cursoSave: CursosService,
    public leftMenu: MenuController
  ) {
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
      this.curso.instituicaoEnsino == '' ||
      this.curso.instituicaoEnsino === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Não é permitido um curso sem  Instituição de Ensino.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      const cursoCopy = JSON.parse(JSON.stringify(this.curso));

      this.cursos.push(cursoCopy);

      this.cursoSave.salvaCursos(this.curso.nome, this.curso.instituicaoEnsino);

      (this.curso.nome = ''), (this.curso.instituicaoEnsino = '');
    }
  }
  profissa() {
    this.nav.back();
  }

  async proximaPagina() {
    if (this.cursos.length === 0) {
      const nextPage = await this.mensagem.create({
        header: 'Atenção',
        message: 'Deseja ir para a próxima página sem adicionar nenhum curso ?',
        buttons: [
          {
            text: 'Não',
            role: 'Cancel',
          },
          {
            text: 'Sim',
            handler: () => {
              this.nav.navigateForward('idiomas');
            },
          },
        ],
      });
      await nextPage.present();
    } else {
      this.nav.navigateForward('idiomas');
    }
  }

  async removerCurso(cursoRemove) {
    console.log(cursoRemove)
    const removerCurso = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message:
        'Confirma a exclusão de ' + cursoRemove.nome + '? Essa ação é irreversível.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('CANCELADO');
          },
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

    await removerCurso.present();
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
