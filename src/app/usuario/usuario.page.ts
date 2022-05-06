import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  public usuario = {
    nome: "",
    rg: "",
    cpf: "",
    dataNasc: "",
    genero: "", 
    estadoCivil: "",
    ocultarIdade: "",
    estaEmpregado: ""
  }

  public genero = [
    { id: "1", genero: "Masculino" },
    { id: "2", genero: "Feminino" },
    { id: "3", genero: "Outros" }  
  ]

  public estadoCivil = [
    { id: "1", estadoCivil: "Solteiro(a)" },
    { id: "2", estadoCivil: "Casado(a)"},
    { id: "3", estadoCivil: "União Estável" },
    { id: "4", estadoCivil: "Divorciado(a)" },
    { id: "5", estadoCivil: "Viúvo(a)" }       
  ]

  public estaEmpregado = [
    { id: "1", estaEmpregado: "SIM" },
    { id: "2", estaEmpregado: "NÃO"}
  ]

  public ocultarIdade = [
    { id: "1", ocultarIdade: "SIM" },
    { id: "2", ocultarIdade: "NÃO"}
  ]

  constructor(public mensagem: AlertController) { }

  ngOnInit() {
  }

  async adicionarUsuario() {
    if (this.usuario.nome == "") {
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
    } else if (this.usuario.rg == "") {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido adicionar um candidato sem RG.",
          buttons: ["ok"],
          cssClass: "cssAlerta"
        } 
      )

      await alerta.present()

      return
      } else if(this.usuario.cpf == "") {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "Não é permitido adicionar um candidato sem CPF.",
            buttons: ["ok"],
            cssClass: "cssAlerta"
          } 
        )
  
        await alerta.present()
  
        return
      } 
      console.log(this.usuario)
    //var usuarioCopy = JSON.parse(JSON.stringify(this.usuario))

    // this.usuario.push(usuarioCopy)   

    this.usuario.nome = ""
    this.usuario.rg = ""
    this.usuario.cpf = ""
    this.usuario.dataNasc = ""
    this.usuario.genero = ""
    this.usuario.estadoCivil = ""
    this.usuario.ocultarIdade = ""
    this.usuario.estaEmpregado = ""

    Storage.remove({ key: "nome" })
    Storage.remove({ key: "rg" })
    Storage.remove({ key: "cpf" })
    Storage.remove({ key: "dataNasc" })
    Storage.remove({ key: "genero" })
    Storage.remove({ key: "ocultarIdade" })
    Storage.remove({ key: "estaEmpregado" })   

  }
/*
  async removerIdioma(idiomaRemove) {
    let confirmaRemover = await this.mensagem.create({
      header: "ATENÇÃO!",
      message: "Confima exclusão de " + idiomaRemove.idioma + "? Essa ação é irreverssível.",
      buttons: [{
        text: "Cancelar", role: "cancel", handler: () => {
          console.log("CANCELADO")
        }
      },
      {
        text: "Excluir", handler: () => {
          const index = this.idiomas.indexOf(idiomaRemove)
          this.idiomas.splice(index, 1)
        }
      }
      ]
    })

    await confirmaRemover.present()
  }
*/
  async salvarTemporariamente() {
    Storage.set({ key: "idioma", value: this.usuario.nome })
    Storage.set({ key: "nivel", value: this.usuario.rg })
    Storage.set({ key: "nivel", value: this.usuario.cpf })
    Storage.set({ key: "nivel", value: this.usuario.dataNasc })
    Storage.set({ key: "nivel", value: this.usuario.genero })
    Storage.set({ key: "nivel", value: this.usuario.estadoCivil })
    Storage.set({ key: "nivel", value: this.usuario.ocultarIdade })
    Storage.set({ key: "nivel", value: this.usuario.estaEmpregado })

    var alerta = await this.mensagem.create(
      {
        header: "ATENÇÃO!",
        message: "Dados armazenados com sucesso!",
        buttons: ["ok"],
        cssClass: "cssAlerta"
      })
    await alerta.present()
  }

  async carregarDados() {
    this.usuario.nome = (await Storage.get({ key: "nome" })).value
    this.usuario.rg = (await Storage.get({ key: "rg" })).value
    this.usuario.cpf = (await Storage.get({ key: "cpf" })).value
    this.usuario.dataNasc = (await Storage.get({ key: "dataNasc" })).value
    this.usuario.genero = (await Storage.get({ key: "genero" })).value
    this.usuario.estadoCivil = (await Storage.get({ key: "estadoCivil" })).value
    this.usuario.ocultarIdade = (await Storage.get({ key: "ocultarIdade" })).value
    this.usuario.estaEmpregado = (await Storage.get({ key: "estaEmpregado" })).value
  }

}
