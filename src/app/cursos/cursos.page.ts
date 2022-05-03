import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

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
  constructor(public mensagem: AlertController) { }

  ngOnInit() {
  }

  async adicionarCurso() {
    if (this.curso.nome == "") {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido adicionar um candidato sem nome.",
          buttons: ["ok"],
          cssClass: "cssAlerta"
        } 
      )

      await alerta.present()

      return
    } else if (this.curso.instituicaoEnsino == "") {
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
      } else if (this.curso.dataInicio == "") {
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
        } 
      console.log(this.curso)
      
    //var cursoCopy = JSON.parse(JSON.stringify(this.curso))

    // this.curso.push(cursoCopy)   

    this.curso.nome = ""
    this.curso.instituicaoEnsino = ""  
    this.curso.dataInicio = ""  
    this.curso.dataConclusao = ""

    Storage.remove({ key: "nome" })
    Storage.remove({ key: "instituicaoEnsino" }) 
    Storage.remove({ key: "dataInicio" }) 
    Storage.remove({ key: "dataConclusao" }) 

  }
/*
  async removerCurso(cursoRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: "ATENÇÃO!",
      message: "Confima exclusão de " + cursoRemove.curso + "? Essa ação é irreverssível.",
      buttons: [{
        text: "Cancelar", role: "cancel", handler: () => {
          console.log("CANCELADO")
        }
      },
      {
        text: "Excluir", handler: () => {
          const index = this.idiomas.indexOf(cursoRemove)
          this.idiomas.splice(index, 1)
        }
      }
      ]
    })

    await confirmaRemover.present()
  }

  async salvarTemporariamente() {
    Storage.set({ key: "nome", value: this.curso.nome })
    Storage.set({ key: "instituicaoEnsiono", value: this.curso.instituicaoEnsino })
    Storage.set({ key: "dataInicio", value: this.curso.dataInicio })
    Storage.set({ key: "dataConclusao", value: this.curso.dataConclusao })
    

    var alerta = await this.mensagem.create(
      {
        header: "ATENÇÃO!",
        message: "Dados armazenados com sucesso!",
        buttons: ["ok"],
        cssClass: "cssAlerta"
      })
    await alerta.present()
  }
*/
  async carregarDados() {
    this.curso.nome = (await Storage.get({ key: "nome" })).value
    this.curso.instituicaoEnsino = (await Storage.get({ key: "instituicaoEnsino" })).value
    this.curso.dataInicio = (await Storage.get({ key: "dataInicio" })).value
    this.curso.dataConclusao = (await Storage.get({ key: "dataConclusao" })).value
  }


}
