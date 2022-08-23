import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscricao-vaga',
  templateUrl: './inscricao-vaga.page.html',
  styleUrls: ['./inscricao-vaga.page.scss'],
})
export class InscricaoVagaPage implements OnInit {
  public inscricaoVaga = {
    quantidade: 20,
  };

  public vagas: any[] = [
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Administrativo'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Comércio'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Contabilidade'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Educação'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Escritório'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Farmácia'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Financeiro'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Jurídico'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Limpeza'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Linha de produção'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Restaurantes'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Recursos Humanos'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Saúde'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Serviços gerais'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Supermercado'
    },
    {
      nome: 'Auxiliar de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Tecnologia'
    }
  ];

  public vaga = {};

  constructor(public nav: NavController) {}

  detalhes() {
    this.nav.navigateForward('vaga-detalhes');
  }

  ngOnInit() {}
}
