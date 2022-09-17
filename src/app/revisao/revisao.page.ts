import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { ContatosService } from '../servicos/contatos.service';
import { CursosService } from '../servicos/cursos.service';
import { ExpProfissionalService } from '../servicos/exp-profissional.service';
import { FormEducacionalService } from '../servicos/form-educacional.service';
import { IdiomasService } from '../servicos/idiomas.service';

@Component({
  selector: 'app-revisao',
  templateUrl: './revisao.page.html',
  styleUrls: ['./revisao.page.scss'],
})
export class RevisaoPage implements OnInit {

  formacoes: any [] = this.servicosFormacao.listar();
  experiencias: any [] = this.servicosExp.listar();
  cursos: any [] = this.servicosCursos.listar();
  idiomas: any [] = this.servicosIdiomas.listar();
  contatos: any [] = this.servicosContatos.listar();
  
  endereco = {
    cep: localStorage.getItem('cep'),
    numero: localStorage.getItem('numero'),
    complemento: localStorage.getItem('complemento'),
    endereco: localStorage.getItem('endereco'),
    bairro: localStorage.getItem('bairro'),
    cidade: localStorage.getItem('cidade'),
    estado: localStorage.getItem('estado'),
  }

  empregado = {
    nome: localStorage.getItem('nome'),
    rg: localStorage.getItem('rg'),
    cpf: localStorage.getItem('cpf'),
    email: localStorage.getItem('email'),
    dataNasc: localStorage.getItem('dataNasc'),
    genero: localStorage.getItem('genero'),
    estadoCivil: localStorage.getItem('estadoCivil'),
    password: localStorage.getItem('password'),
    descricaoUser: localStorage.getItem('descricao-usuario')
  }

  empresa = {
    nomeEmpresa: localStorage.getItem('nomeEmpresa'),
    fantasia: localStorage.getItem('fantasia'),
    cnpj: localStorage.getItem('cnpj'),
    email: localStorage.getItem('email'),
    dataAb: localStorage.getItem('dtAb'),
    cnae: localStorage.getItem('cnae'),
    situacao: localStorage.getItem('situacao'),
    natureza: localStorage.getItem('natureza'),
    ramo: localStorage.getItem('ramo'),
    descricaoEmpresa: localStorage.getItem('descricaoEmpresa')
  }

  constructor(public mensagem: AlertController, 
    public menuLeft: MenuController,
    public nav: NavController,
    public servicosContatos: ContatosService,
    public servicosFormacao: FormEducacionalService,
    public servicosExp: ExpProfissionalService,
    public servicosCursos: CursosService,
    public servicosIdiomas: IdiomasService) 
   {
    this.menuLeft.enable(false)
   }

  ngOnInit() {
  }
    
  usuarioEdit(){
    this.nav.navigateRoot('usuario')
  }

  empresaEdit(){
    this.nav.navigateRoot('empresa')
  }

  enderecoEdit(){
    this.nav.navigateRoot('endereco')
  }

  contatoEdit(){
    this.nav.navigateRoot('contato')
  }

  formacaoEdit(){
    this.nav.navigateRoot('formacao-educacional')
  }

  expEdit(){
    this.nav.navigateRoot('exp-profissional')
  }

  cursoEdit(){
    this.nav.navigateRoot('cursos')
  }

  idiomaEdit(){
    this.nav.navigateRoot('idiomas')
  }

  descEdit(){
    this.nav.navigateRoot('detalhes-usuario')
  }

  ramoEdit(){
    this.nav.navigateRoot('detalhes-empresa')
  }

  async concluir (){
    const main = await this.mensagem.create({
      header: 'Concluir cadastro',
      message: 'Seus dados estão corretos?',
      buttons:[
        {
          text: 'Sim',
          handler: () => {
            this.nav.navigateRoot('conclusao');
          },
        },
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await main.present();
  }

}

