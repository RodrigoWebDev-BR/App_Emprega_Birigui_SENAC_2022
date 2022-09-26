import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
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

  profile = localStorage.getItem('profile')
  
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
    descricaoUser: localStorage.getItem('descricao-usuario'),
    formacoes: this.servicosFormacao.listar(),
    experiencias: this.servicosExp.listar(),
    cursos: this.servicosCursos.listar(),
    idiomas: this.servicosIdiomas.listar(),
    contatos:  this.servicosContatos.listar()
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

  constructor(public menuLeft: MenuController,
    public nav: NavController,
    public servicosContatos: ContatosService,
    public servicosFormacao: FormEducacionalService,
    public servicosExp: ExpProfissionalService,
    public servicosCursos: CursosService,
    public servicosIdiomas: IdiomasService,
    public mensagem: AlertController) {
    this.menuLeft.enable(false)
   }

  ngOnInit() {
    localStorage.removeItem('editar')
  }
    
  empregadoEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('usuario')
  }

  empresaEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('empresa')
  }

  enderecoEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('endereco')
  }

  contatoEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('contato')
  }

  formacaoEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('formacao-educacional')
  }

  expEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('exp-profissional')
  }

  cursoEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('cursos')
  }

  idiomaEdit(){
    localStorage.setItem('editar', 'true')
    this.nav.navigateRoot('idiomas')
  }

  descEdit(){
    this.nav.navigateRoot('detalhes-usuario')
  }

  ramoEdit(){
    this.nav.navigateRoot('detalhes-empresa')
  }

  async concluir(){
    const main = await this.mensagem.create({
    header: 'Concluir cadastro',
    message: 'Seus dados estão corretos?',
    buttons: [
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
