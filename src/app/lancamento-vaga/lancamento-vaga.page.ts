import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-vaga',
  templateUrl: './lancamento-vaga.page.html',
  styleUrls: ['./lancamento-vaga.page.scss'],
})
export class LancamentoVagaPage implements OnInit {
  vaga = {
    nomeEmpresa: 'Amigão',
    cidade: 'Birigui-SP',
    tituloVaga: '',
    contrato: '',
    prazo: '',
    horario: '',
    combinado: '',
    salario: '',
    qualificacao: '',
    alimentacao: '',
    medica: '',
    descricao: ''
  };

  public beneficio = {nome: ''};
  public beneficios: any[] = [];

  qualificacoes = [
    {nivel: 'Aprendiz maior 14 anos'},
    {nivel: 'Aprendiz maior 16 anos'},
    {nivel: 'Aprendiz maior 18 anos'},
    {nivel: '2º Grau Médio - Cursando'},
    {nivel: '2º Grau Médio - Completo'},
    {nivel: 'Técnologo - Cursando'},
    {nivel: 'Técnologo - Completo'},
    {nivel: 'Ensino Superior - Cursando'},
    {nivel: 'Ensino Superior - Completo'},
    {nivel: 'Pós Graduação - Cursando'},
    {nivel: 'Pós Graduação - Completo'},
    {nivel: 'Mestrado - Cursando'},
    {nivel: 'Mestrado - Completo'},
    {nivel: 'Doutorado - Cursando'},
    {nivel: 'Doutorado - Completo'}
  ];

  contratos = [{nome: 'CLT'}, {nome: 'PJ'}, {nome: 'Estágio'}];

  prazos = [{nome: 'Indeterminado'}, {nome: 'Temporário'}];

  inclusos = [{nome: 'Incluso'}, {nome: 'Não incluso'}];

  constructor(public nav: NavController, public mensagem: AlertController) {}

  finalizar(){
    this.nav.navigateForward('conclusao-vaga');
  }

  ngOnInit() {}
}
