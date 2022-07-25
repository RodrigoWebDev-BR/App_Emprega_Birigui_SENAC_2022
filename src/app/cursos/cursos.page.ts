import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { CursosService } from '../servicos/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})

export class CursosPage implements OnInit {

  public curso = {
    nome: "",
    instituicaoEnsino: "",
    dataInicio: "",
    dataConclusao: ""
  }

  public cursos: any[] = []

  constructor(public mensagem: AlertController, public nav: NavController, public menuLeft: MenuController, public cursoServ: CursosService) {
    this.menuLeft.enable(false);
    this.carregarDados()
  }

  ngOnInit() {
    this.carregarDados();
  }

  async adicionarCurso() {
    if (this.curso.nome === '' || this.curso.nome === null) {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido adicionar um curso sem nome.",
          buttons: ["ok"],
          cssClass: "cssAlerta"
        }
      )

      await alerta.present()

      return
    } else if (this.curso.instituicaoEnsino === '' || this.curso.instituicaoEnsino === null) {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido um curso sem  Instituição de Ensino.",
          buttons: ["ok"],
          cssClass: "cssAlerta"
        }
      )

      await alerta.present()

      return
    } else if (this.curso.dataInicio === '' || this.curso.dataInicio === null) {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido adicionar um curso sem data de início.",
          buttons: ["ok"],
          cssClass: "cssAlerta"
        }
      )

      await alerta.present()

      return
    } else {

      const cursoCopy = JSON.parse(JSON.stringify(this.curso))
      console.log(cursoCopy)
      this.cursos.push(cursoCopy)

      this.cursoServ.salvarCurso(this.curso.nome, this.curso.instituicaoEnsino, this.curso.dataInicio, this.curso.dataConclusao)

      this.curso.nome = ''
      this.curso.instituicaoEnsino = ''
      this.curso.dataInicio = ''
      this.curso.dataConclusao = ''
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
            role: 'cancel'
          },
          {
            text: 'Sim',
            handler: () => {
              this.nav.navigateForward('idiomas')
            }
          }
        ]
      });

      await nextPage.present();
    } else {
      this.nav.navigateForward('idiomas')
    }
  }

  async removerCurso(cursoRemove) {
    const confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Confima exclusão de ' + cursoRemove.nome + '? Essa ação é irreverssível.',
      buttons: [{
        text: 'Cancelar', role: 'cancel', handler: () => {
          console.log("CANCELADO")
        }
      },
      {
        text: 'Excluir', handler: () => {
          this.cursoServ.deletar(cursoRemove.nome)

          const index = this.cursos.indexOf(cursoRemove)
          this.cursos.splice(index, 1)
        }
      }
      ]
    })

    await confirmaRemover.present()
  }

  carregarDados() {
    if (this.cursoServ.listar !== undefined) {
      this.cursos = this.cursoServ.listar();
    }
  }


}
