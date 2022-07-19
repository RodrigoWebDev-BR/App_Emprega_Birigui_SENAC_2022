import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})

export class UsuarioPage implements OnInit {

  public usuario = {
    nome: null,
    rg: null,
    cpf: null,
    email: null,
    dataNasc: null,
    genero: null, 
    estadoCivil: null,
    ocultarIdade: null,
    estaEmpregado: null,
    senha: null,
    confirmacao: null
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

  constructor(public mensagem: AlertController, public route: Router, public menuLeft: MenuController) 
  { this.menuLeft.enable(false) }

  login(){
    this.route.navigate(['login'])
  }

  ngOnInit() {
  }

  async adicionarUsuario() {

    if (this.usuario.nome === '' || this.usuario.nome === null) {
      
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o nome.',
          buttons: ['ok']
        } 
      );
      await alerta.present()

      return;

    } else if (this.usuario.rg === '' || this.usuario.rg === null) {
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO!',
          message: 'É necessário informar o RG.',
          buttons: ['ok']
        } 
      )

      await alerta.present();

      return;

      } else if (this.usuario.cpf === '' || this.usuario.cpf === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar o CPF.',
            buttons: ['ok']
          } 
        )
  
        await alerta.present()
  
        return
      } else if (this.usuario.email === '' || this.usuario.email === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar o E-Mail.',
            buttons: ['ok']
          } 
        )
  
        await alerta.present()
  
        return;
      } else if (this.usuario.dataNasc === '' || this.usuario.dataNasc === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar a data de nascimento.',
            buttons: ['ok']
          } 
        )
  
        await alerta.present()
  
        return;
      } else if (this.usuario.genero === '' || this.usuario.genero === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar o gênero.',
            buttons: ['ok']
          } 
        )
  
        await alerta.present();
  
        return;
      } else if (this.usuario.estadoCivil === '' || this.usuario.estadoCivil === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar o estado civil atual.',
            buttons: ['ok']
          } 
        )
  
        await alerta.present();
  
        return;
      } else if (this.usuario.ocultarIdade === '' || this.usuario.ocultarIdade === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar se deseja ocultar a idade.',
            buttons: ['ok']
          } 
        );
  
        await alerta.present();
  
        return;
      } else if (this.usuario.estaEmpregado === '' || this.usuario.estaEmpregado === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar se está empregado.',
            buttons: ['ok']
          } 
        );
  
        await alerta.present();
  
        return;
      } else if (this.usuario.senha === '' || this.usuario.senha === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar uma senha.',
            buttons: ['ok']
          } 
        );
  
        await alerta.present();
  
        return;
      }else if (this.usuario.confirmacao === '' || this.usuario.confirmacao === null) {
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO!',
            message: 'É necessário informar a confirmação de senha.',
            buttons: ['ok']
          } 
        );
  
        await alerta.present();
  
        return;
      }else{

        if(this.usuario.senha !== this.usuario.confirmacao){
          const alerta = await this.mensagem.create(
            {
              header: 'ATENÇÃO!',
              message: 'As senhas precisam coincidir uma com a outra.',
              buttons: ['ok']
            } 
          );
    
          await alerta.present();
    
          return;

        }else{

        this.usuario.nome = ""
        this.usuario.rg = ""
        this.usuario.cpf = ""
        this.usuario.email = ""
        this.usuario.dataNasc = ""
        this.usuario.genero = ""
        this.usuario.estadoCivil = ""
        this.usuario.ocultarIdade = ""
        this.usuario.estaEmpregado = ""
    
        Storage.remove({ key: "nome" })
        Storage.remove({ key: "rg" })
        Storage.remove({ key: "cpf" })
        Storage.remove({ key: "email" })
        Storage.remove({ key: "dataNasc" })
        Storage.remove({ key: "genero" })
        Storage.remove({ key: "ocultarIdade" })
        Storage.remove({ key: "estaEmpregado" })   
        this.route.navigate(['endereco']);
        }
      }
      
    //var usuarioCopy = JSON.parse(JSON.stringify(this.usuario))

    // this.usuario.push(usuarioCopy)   

    
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
    this.usuario.email = (await Storage.get({ key: "email" })).value
    this.usuario.dataNasc = (await Storage.get({ key: "dataNasc" })).value
    this.usuario.genero = (await Storage.get({ key: "genero" })).value
    this.usuario.estadoCivil = (await Storage.get({ key: "estadoCivil" })).value
    this.usuario.ocultarIdade = (await Storage.get({ key: "ocultarIdade" })).value
    this.usuario.estaEmpregado = (await Storage.get({ key: "estaEmpregado" })).value
  }

}
