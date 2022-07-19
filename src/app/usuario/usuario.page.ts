import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})


export class UsuarioPage implements OnInit {

  public usuarios: any[] = [];

  public usuario = { nome: null,rg: null,cpf: null,dataNasc: null,genero: null, estadoCivil: null,ocultarIdade: null,estaEmpregado: null, senha: null, confirmar: null
  }

  public genero = [
    { id: "1", genero: "Masculino" },
    { id: "2", genero: "Feminino" },
    { id: "3", genero: "Outros" }, 
    { id: "4", genero: "Não informar" }  
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

  proximaPagina() {
    console.log(this.proximaPagina)
    this.rota.navigate(['endereco'])
  }

  constructor(public mensagem: AlertController, public rota: Router) { }

  ngOnInit() {
  }

  async adicionarUsuario() {
    if (this.usuario.nome == '' || this.usuario.nome == null) {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido adicionar um candidato sem nome.",
          buttons: ["ok"]
        } 
      )

      await alerta.present()

      return
    } else if (this.usuario.rg == "" || this.usuario.rg == null) {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido adicionar um candidato sem RG.",
          buttons: ["ok"]
        } 
      )

      await alerta.present()

      return
      } else if(this.usuario.cpf == '' || this.usuario.cpf == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "Não é permitido adicionar um candidato sem CPF.",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      // }else if(this.usuario.dataNasc == '' || this.usuario.dataNasc == null) {
      //   const alerta = await this.mensagem.create(
      //     {
      //       header: "ATENÇÃO!",
      //       message: "É necessário inserir sua data de nascimento",
      //       buttons: ["ok"]
      //     } 
      //   )
  
      //   await alerta.present()
  
      //   return
      }else if(this.usuario.genero == '' || this.usuario.genero == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "É necessário selecionar um genêro",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else if(this.usuario.estadoCivil == '' || this.usuario.estadoCivil == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "É necessário selecionar um estado civil",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else if(this.usuario.ocultarIdade == '' || this.usuario.ocultarIdade == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "É necessário selecionar uma opção no campo 'Ocultar idade'",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else if(this.usuario.estaEmpregado == '' || this.usuario.estaEmpregado == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "É necessário selecionar uma opção no campo 'Está empregado?'",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else if(this.usuario.senha == '' || this.usuario.estaEmpregado == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "É necessário inserir uma senha",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else if(this.usuario.confirmar == '' || this.usuario.estaEmpregado == null) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "Insira a senha igual no campo confirmar",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else if(this.usuario.confirmar !== this.usuario.senha) {
        const alerta = await this.mensagem.create(
          {
            header: "ATENÇÃO!",
            message: "Senhas diferentes inseridas",
            buttons: ["ok"]
          } 
        )
  
        await alerta.present()
  
        return
      }else{
          var usuarioCopy = JSON.parse(JSON.stringify(this.usuario))
      
          this.usuarios.push(usuarioCopy)   
      
          this.usuario.nome = ""
          this.usuario.rg = ""
          this.usuario.cpf = ""
          this.usuario.dataNasc = ""
          this.usuario.genero = ""
          this.usuario.estadoCivil = ""
          this.usuario.ocultarIdade = ""
          this.usuario.estaEmpregado = ""
          this.usuario.senha = ""
          this.usuario.confirmar = ""
      
          Storage.remove({ key: "nome" })
          Storage.remove({ key: "rg" })
          Storage.remove({ key: "cpf" })
          Storage.remove({ key: "dataNasc" })
          Storage.remove({ key: "genero" })
          Storage.remove({ key: "ocultarIdade" })
          Storage.remove({ key: "estaEmpregado" })
          Storage.remove({key:"senha"})
          Storage.remove({key:"confirmar"}) 
          this.rota.navigate(['endereco']);
      }   
  }

  // async salvarTemporariamente() {
  //   Storage.set({ key: "idioma", value: this.usuario.nome })
  //   Storage.set({ key: "nivel", value: this.usuario.rg })
  //   Storage.set({ key: "nivel", value: this.usuario.cpf })
  //   Storage.set({ key: "nivel", value: this.usuario.dataNasc })
  //   Storage.set({ key: "nivel", value: this.usuario.genero })
  //   Storage.set({ key: "nivel", value: this.usuario.estadoCivil })
  //   Storage.set({ key: "nivel", value: this.usuario.ocultarIdade })
  //   Storage.set({ key: "nivel", value: this.usuario.estaEmpregado })

  //   var alerta = await this.mensagem.create(
  //     {
  //       header: "ATENÇÃO!",
  //       message: "Dados armazenados com sucesso!",
  //       buttons: ["ok"],
  //       cssClass: "cssAlerta"
  //     })
  //   await alerta.present()
  // }

  // async carregarDados() {
  //   this.usuario.nome = (await Storage.get({ key: "nome" })).value
  //   this.usuario.rg = (await Storage.get({ key: "rg" })).value
  //   this.usuario.cpf = (await Storage.get({ key: "cpf" })).value
  //   this.usuario.dataNasc = (await Storage.get({ key: "dataNasc" })).value
  //   this.usuario.genero = (await Storage.get({ key: "genero" })).value
  //   this.usuario.estadoCivil = (await Storage.get({ key: "estadoCivil" })).value
  //   this.usuario.ocultarIdade = (await Storage.get({ key: "ocultarIdade" })).value
  //   this.usuario.estaEmpregado = (await Storage.get({ key: "estaEmpregado" })).value
  // }

}
