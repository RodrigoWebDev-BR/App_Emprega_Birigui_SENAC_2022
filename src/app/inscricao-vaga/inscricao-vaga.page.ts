import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscricao-vaga',
  templateUrl: './inscricao-vaga.page.html',
  styleUrls: ['./inscricao-vaga.page.scss'],
})
export class InscricaoVagaPage implements OnInit {

  public inscricaoVaga = {
    nome: "",
    quantidade: "",
    data: "",
    salario: ""    
  }

  public vagas: any[] = [{
    nome: "teste",
    quantidade: "10567",
    data: "29/04/2022",
    salario: "R$ 2000.00" ,
  },
  {
    nome: "teste",
    quantidade: "10567",
    data: "29/04/2022",
    salario: "R$ 2000.00" 
  }]

  public vaga = {}
  
  proximaPagina() {
    console.log(this.proximaPagina)
    this.rota.navigate(['vaga-detalhes'])
  }

  constructor(public rota: Router) { }

  ngOnInit() {
  }
/*
  async adicionarIdioma() {
    if (this.inscricaoVaga.nome == "" || this.inscricaoVaga.quantidade == "" || this.inscricaoVaga.data == "" || this.inscricaoVaga.salario == "") {
      const alerta = await this.mensagem.create(
        {
          header: "ATENÇÃO!",
          message: "Não é permitido inserir um idioma vazio.",
          buttons: ["ok"],
          cssClass: "cssAlerta"
        }
      )

      await alerta.present()

      return
    }

    var inscricaoCopy = JSON.parse(JSON.stringify(this.inscricaoVaga))

    this.inscricao.push(inscricaoCopy)   

    this.inscricaoVaga.nome = ""
    this.inscricaoVaga.quantidade = ""
    this.inscricaoVaga.data = ""
    this.inscricaoVaga.salario = ""

    Storage.remove({ key: "nome" })
    Storage.remove({ key: "quantidade" })
    Storage.remove({ key: "data" })
    Storage.remove({ key: "salario" })
*/
  }
/*
  async removerInscricao(inscricaoRemove) {
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
          const index = this.inscricao.indexOf(idiomaRemove)
          this.inscricao.splice(index, 1)
        }
      }
      ]
    })

    await confirmaRemover.present()
  }

  async salvarTemporariamente() {
    Storage.set({ key: "idioma", value: this.inscricaoVaga.idioma })
    Storage.set({ key: "nivel", value: this.inscricaoVaga.nivel })


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
    this.inscricaoVaga.idioma = (await Storage.get({ key: "idioma" })).value
    this.inscricaoVaga.nivel = (await Storage.get({ key: "nivel" })).value
  }

}
*/