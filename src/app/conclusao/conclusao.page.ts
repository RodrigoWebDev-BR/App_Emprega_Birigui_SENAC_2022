import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../servicos/contatos.service';
import { FormEducacionalService } from '../servicos/form-educacional.service';
import { ExpProfissionalService } from '../servicos/exp-profissional.service';
import { CursosService } from '../servicos/cursos.service';
import { IdiomasService } from '../servicos/idiomas.service';
import { CadastroService } from '../servicos/cadastro.service';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  resp: any = {};
  nome: string;
  constructor(
    public leftMenu: MenuController,
    public nav: NavController,
    public servicosContatos: ContatosService,
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

    if(localStorage.getItem('nome') === null){
      this.cadastroEmpresa()
    }else{
      this.cadastroEmpregado()
    }

    setTimeout(() => {
      if (this.nome !== 'erro') {
        if (
          localStorage.getItem('nome') === null ||
          localStorage.getItem('nome') === undefined
        ) {
          localStorage.clear();
          this.nav.navigateRoot('login/empresa_' + this.nome);
        } else {
          localStorage.clear();
          this.nav.navigateRoot('login/empregado_' + this.nome);
        }
      }else{
        this.nav.navigateRoot('login/erro')
      }
    }, 4000);
  }

  async exibeToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: 'warning',
    });

    toast.present();
  }

  cadastroEmpregado(){
    const empregado = {
      nome: localStorage.getItem('nome'),
      rg: localStorage.getItem('rg'),
      cpf: localStorage.getItem('cpf'),
      email: localStorage.getItem('email'),
      dataNasc: localStorage.getItem('dataNasc'),
      genero: localStorage.getItem('genero'),
      estadoCivil: localStorage.getItem('estadoCivil'),
      password: localStorage.getItem('password'),
      profiles: localStorage.getItem('profile'),
      cep: localStorage.getItem('cep'),
      numero: localStorage.getItem('numero'),
      complemento: localStorage.getItem('complemento'),
      endereco: localStorage.getItem('endereco'),
      bairro: localStorage.getItem('bairro'),
      cidade: localStorage.getItem('cidade'),
      estado: localStorage.getItem('estado'),
      contatos: this.servicosContatos.listar(),
      formacaoEdu: this.servicosFormacao.listar(),
      expProfissional: this.servicosExp.listar(),
      cursos: this.servicosCursos.listar(),
      idiomas: this.servicosIdiomas.listar(),
      descricaoUser: localStorage.getItem('descricao-usuario')
    }


    this.cadastro.cadastrar(empregado, 'empregado')
    .then((response)=>{
      this.resp = response;
      if(this.resp !== undefined){
        this.nome = this.resp.nome;
      }else{
        this.exibeToast('Erro ao cadastrar');
        this.nome = 'erro';
      }
    })
    .catch((e)=>{
      this.exibeToast('Erro com o servidor!');
      this.nome = 'erro'
    });
  }
  
  cadastroEmpresa(){
    const empresa = {
      nomeEmpresa: localStorage.getItem('nomeEmpresa'),
      fantasia: localStorage.getItem('fantasia'),
      cnpj: localStorage.getItem('cnpj'),
      email: localStorage.getItem('email'),
      dataAb: localStorage.getItem('dtAb'),
      cnae: localStorage.getItem('cnae'),
      situacao: localStorage.getItem('situacao'),
      natureza: localStorage.getItem('natureza'),
      password: localStorage.getItem('password'),
      profiles: localStorage.getItem('profile'),
      cep: localStorage.getItem('cep'),
      numero: localStorage.getItem('numero'),
      complemento: localStorage.getItem('complemento'),
      endereco: localStorage.getItem('endereco'),
      bairro: localStorage.getItem('bairro'),
      cidade: localStorage.getItem('cidade'),
      estado: localStorage.getItem('estado'),
      contatos: this.servicosContatos.listar(),
      ramo: localStorage.getItem('ramo'),
      descricaoEmpresa: localStorage.getItem('descricaoEmpresa'),
      autorizado: false
    }

    this.cadastro.cadastrar(empresa, 'empresa')
    .then((response)=>{
      this.resp = response;
      if(this.resp !== undefined){
        this.nome = this.resp.nomeEmpresa;
      }else{
        this.exibeToast('Erro ao cadastrar');
        this.nome = 'erro';
      }
    })
    .catch((e)=>{
      this.exibeToast('Erro com o servidor!');
      this.nome = 'erro'
    });
  }
}
