import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ContatosService } from '../servicos/contatos.service';
import { CursosService } from '../servicos/cursos.service';
import { EmpregadoService } from '../servicos/empregado.service';
import { EmpresaService } from '../servicos/empresa.service';
import { ExpProfissionalService } from '../servicos/exp-profissional.service';
import { FormEducacionalService } from '../servicos/form-educacional.service';
import { IdiomasService } from '../servicos/idiomas.service';

@Component({
  selector: 'app-revisao',
  templateUrl: './revisao.page.html',
  styleUrls: ['./revisao.page.scss'],
})
export class RevisaoPage implements OnInit {

  empresario = true;
  empregado = false;

  public perfil = {
    nome: null,
    rg: null,
    cpf: null,
    email: null,
    dataNasc: null,
    genero: null,
    estadoCivil: null,
    senha: null,
    cep: null,
    numero: null,
    complemento: null,
    endereco: null,
    bairro: null,
    cidade: null,
    estado: null,
    contatos : [],
    formacaoEduca : [],
    expProf : [],
    cursos : [],
    idiomas : [],
    descricaoUser: null
  };

  public empresa = {
    nomeEmpresa: null,
    fantasia: null,
    cnpj: null,
    email: null,
    dataAb: null,
    senha: null,
    situacao: null,
    natureza: null,
    cnae: null,
    cep: null,
    numero: null,
    complemento: null,
    endereco: null,
    bairro: null,
    cidade: null,
    estado: null,
    contatos : [],
    ramo: null,
    descricaoEmpresa: null
  }

  constructor(
    public servicosContato: ContatosService,
    public servicosFormacao: FormEducacionalService,
    public servicosExp: ExpProfissionalService,
    public servicosCurso: CursosService,
    public servicosIdiomas: IdiomasService,
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService,
    public nav: NavController
  ) {}


  ngOnInit() {
    if (localStorage.getItem('cpf')) {
      this.carregarDadosUser();
      this.empregado = true
    } else if (localStorage.getItem('cnpj')) {
      this.carregarDadosEmpresa();
      this.empresario = true
    }
  }

  

  carregarDadosUser() {
    this.perfil.nome = localStorage.getItem('nome');
    this.perfil.rg = localStorage.getItem('rg');
    this.perfil.cpf = localStorage.getItem('cpf');
    this.perfil.email = localStorage.getItem('email');
    this.perfil.dataNasc = localStorage.getItem('dataNasc');
    this.perfil.genero = localStorage.getItem('genero');
    this.perfil.estadoCivil = localStorage.getItem('estadoCivil');
    this.perfil.senha = localStorage.getItem('senha');
    this.perfil.cep = localStorage.getItem('cep');
    this.perfil.numero = localStorage.getItem('numero');
    this.perfil.complemento = localStorage.getItem('complemento');
    this.perfil.endereco = localStorage.getItem('endereco');
    this.perfil.bairro = localStorage.getItem('bairro');
    this.perfil.cidade = localStorage.getItem('cidade');
    this.perfil.estado = localStorage.getItem('estado');
    this.perfil.contatos = this.servicosContato.listar();
    this.perfil.formacaoEduca = this.servicosFormacao.listar();
    this.perfil.expProf = this.servicosExp.listar();
    this.perfil.cursos = this.servicosCurso.listar();
    this.perfil.idiomas = this.servicosIdiomas.listar();
    this.perfil.descricaoUser = localStorage.getItem('descricao-usuario');
  }

  carregarDadosEmpresa() {
    this.empresa.nomeEmpresa = localStorage.getItem('nomeEmpresa');
    this.empresa.fantasia = localStorage.getItem('fantasia');
    this.empresa.cnpj = localStorage.getItem('cnpj');
    this.empresa.email = localStorage.getItem('email');
    this.empresa.dataAb = localStorage.getItem('dataAb');
    this.empresa.cnae = localStorage.getItem('cnae');
    this.empresa.situacao = localStorage.getItem('situacao');
    this.empresa.natureza = localStorage.getItem('natureza');
    this.empresa.senha = localStorage.getItem('password');
    this.empresa.cep = localStorage.getItem('cep');
    this.empresa.numero = localStorage.getItem('numero');
    this.empresa.complemento = localStorage.getItem('numero');
    this.empresa.endereco = localStorage.getItem('endereco');
    this.empresa.bairro = localStorage.getItem('bairro');
    this.empresa.cidade = localStorage.getItem('cidade');
    this.empresa.estado = localStorage.getItem('estado');
    this.empresa.contatos = this.servicosContato.listar();
    this.empresa.ramo = localStorage.getItem('ramo');
    this.empresa.descricaoEmpresa = localStorage.getItem('descricaoEmpresa');
  }

  user() {
    this.nav.navigateRoot('usuario');
  }

  endereco() {
    this.nav.navigateRoot('endereco');
  }

  contato() {
    this.nav.navigateRoot('contato');
  }

  formacaoEdu() {
    this.nav.navigateRoot('formacao-educacional');
  }

  expProfissional() {
    this.nav.navigateRoot('exp-profissional');
  }

  cursos() {
    this.nav.navigateRoot('cursos');
  }

  idiomas() {
    this.nav.navigateRoot('idiomas');
  }

  conclusao(){
    this.nav.navigateForward('conclusao');
  }
}
