import { CadastroService } from './../servicos/cadastro.service';
import { IdiomasService } from './../servicos/idiomas.service';
import { CursosService } from './../servicos/cursos.service';
import { ExpProfissionalService } from './../servicos/exp-profissional.service';
import { FormEducacionalService } from './../servicos/form-educacional.service';
import { ContatosService } from './../servicos/contatos.service';
import { Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  resp: any = {};
  nome: string;
  vagas: any = [];
  constructor(
    public leftMenu: MenuController,
    public nav: NavController,
    public servicosContato: ContatosService,
    public servicosFormacao: FormEducacionalService,
    public servicosExp: ExpProfissionalService,
    public servicosCursos: CursosService,
    public servicosIdiomas: IdiomasService,
    public toast: ToastController,
    public cadastro: CadastroService
  ) {
    this.leftMenu.enable(false);
  }

  async ngOnInit() {
    switch (localStorage.getItem('profile')) {
      case 'empresa':
        this.cadastroEmpresa();
        break;

      case 'empregado':
        this.cadastroEmpregado();
        break;

      case 'user_master':
        this.cadastroMaster();
        break;
    }

    // setTimeout(() => {
    //   localStorage.setItem('nomeCadastro', this.nome);
    //   localStorage.setItem('profileConcluido', localStorage.getItem('profile'));
    //   this.nav.navigateRoot('login');
    // }, 4000);
  }

  async exibeToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: 'danger',
    });

    toast.present();
  }

  cadastroMaster() {
    const master = {
      nome: localStorage.getItem('nome'),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      profiles: ['user_master'],
    };

    this.cadastro
      .cadastrar(master, 'masters')
      .then((response) => {
        this.resp = response;
        if (this.resp !== undefined) {
          this.nome = this.resp.nome;
        } else {
          this.exibeToast('Erro ao cadastrar!');
          this.nome = 'erro';
        }
      })
      .catch((e) => {
        this.exibeToast('Erro com o servidor!');
        this.nome = 'erro';
      });
  }

  cadastroEmpregado() {
    const empregado = {
      nome: localStorage.getItem('nome'),
      rg: localStorage.getItem('rg'),
      cpf: localStorage.getItem('cpf'),
      email: localStorage.getItem('email'),
      dataNasc: localStorage.getItem('dataNasc'),
      genero: localStorage.getItem('genero'),
      estadoCivil: localStorage.getItem('estadoCivil'),
      password: localStorage.getItem('password'),
      profiles: ['empregado'],
      cep: localStorage.getItem('cep'),
      numero: localStorage.getItem('numero'),
      complemento: localStorage.getItem('complemento'),
      endereco: localStorage.getItem('endereco'),
      bairro: localStorage.getItem('bairro'),
      cidade: localStorage.getItem('cidade'),
      estado: localStorage.getItem('estado'),
      contatos: this.servicosContato.listar(),
      formacaoEdu: this.servicosFormacao.listar(),
      expProfissional: this.servicosExp.listar(),
      cursos: this.servicosCursos.listar(),
      idiomas: this.servicosIdiomas.listar(),
      descricaoUser: localStorage.getItem('descricao-usuario'),
      candidaturas: undefined,
      numberRecovery: 0,
    };

    this.cadastro
      .cadastrar(empregado, 'empregado')
      .then((response) => {
        this.resp = response;
        if (this.resp !== undefined) {
          this.nome = this.resp.nome;
        } else {
          this.exibeToast('Erro ao cadastrar!');
          this.nome = 'erro';
        }
      })
      .catch((e) => {
        this.exibeToast('Erro com o servidor!');
        this.nome = 'erro';
      });
  }

  cadastroEmpresa() {
    const empresa = {
      nomeEmpresa: localStorage.getItem('nomeEmpresa'),
      fantasia: localStorage.getItem('fantasia'),
      responsavel: localStorage.getItem('responsavel'),
      cnpj: localStorage.getItem('cnpj'),
      email: localStorage.getItem('email'),
      dataAb: localStorage.getItem('dataAb'),
      cnae: localStorage.getItem('cnae'),
      situacao: localStorage.getItem('situacao'),
      natureza: localStorage.getItem('natureza'),
      password: localStorage.getItem('password'),
      profiles: ['empresa'],
      cep: localStorage.getItem('cep'),
      numero: localStorage.getItem('numero'),
      complemento: localStorage.getItem('complemento'),
      endereco: localStorage.getItem('endereco'),
      bairro: localStorage.getItem('bairro'),
      cidade: localStorage.getItem('cidade'),
      estado: localStorage.getItem('estado'),
      contatos: this.servicosContato.listar(),
      ramo: localStorage.getItem('ramo'),
      descricaoEmpresa: localStorage.getItem('descricaoEmpresa'),
      aceita: false,
      recusada: false,
      numberRecovery: 0,
    };

    this.cadastro
      .cadastrar(empresa, 'empresa')
      .then((response) => {
        this.resp = response;
        if (this.resp !== undefined) {
          this.nome = this.resp.nomeEmpresa;
        } else {
          this.exibeToast('Erro ao cadastrar!');
          this.nome = 'erro';
        }
      })
      .catch((e) => {
        this.exibeToast('Erro com o servidor!');
        this.nome = 'erro';
      });
  }
}
