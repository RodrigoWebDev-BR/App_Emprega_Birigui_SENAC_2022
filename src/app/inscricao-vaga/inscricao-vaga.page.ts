import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      nome: 'Administrador',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Administrativo'
    },
    {
      nome: 'Vendedor',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Comércio'
    },
    {
      nome: 'Contador',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Contabilidade'
    },
    {
      nome: 'Docente Senac',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Educação'
    },
    {
      nome: 'Cinema',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Entretenimento'
    },
    {
      nome: 'Analista de suporte',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Escritório'
    },
    {
      nome: 'Auxiliar de farmácia',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Farmácia'
    },
    {
      nome: 'Tesoureiro',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Financeiro'
    },
    {
      nome: 'Advogado',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Jurídico'
    },
    {
      nome: 'Auxiliar de limpeza',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Limpeza'
    },
    {
      nome: 'Produtor',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Linha de produção'
    },
    {
      nome: 'Garçom',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Restaurantes'
    },
    {
      nome: 'Administrador',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Recursos Humanos'
    },
    {
      nome: 'Aux. de Enfermagem',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Saúde'
    },
    {
      nome: 'Servente',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Serviços gerais'
    },
    {
      nome: 'Empacotador',
      nomeEmpresa: 'Santa Casa',
      cidade: 'Araçatuba',
      quantidade: 5,
      salario: 'R$ 2500.00',
      categoria: 'Supermercado'
    },
    {
      nome: 'Desenvolvedor Angular',
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
