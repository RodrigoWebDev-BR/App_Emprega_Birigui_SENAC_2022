import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.page.html',
  styleUrls: ['./curriculo.page.scss'],
})
export class CurriculoPage implements OnInit {


  public estadoCivil = [
    { id: "1", estadoAtual: "Solteiro(a)" },
    { id: "2", estadoAtual: "Casado(a)" },
    { id: "3", estadoAtual: "União Estável" },
    { id: "4", estadoAtual: "Divorciado(a)" },
    { id: "5", estadoAtual: "Viúvo(a)" }
  ];

  tipoContato = [
    { id: '1', nome: 'Celular' },
    { id: '2', nome: 'Telefone' },
    { id: '3', nome: 'LinkedIn' },
    { id: '4', nome: 'Instagram' },
    { id: '5', nome: 'Facebook' },
  ]

  formacoes = [
    { id: '1', nivel: '2º Grau Médio' },
    { id: '2', nivel: 'Técnologo' },
    { id: '3', nivel: 'Ensino Superior' },
    { id: '4', nivel: 'Pós Graduação' },
    { id: '5', nivel: 'Mestrado' },
    { id: '6', nivel: 'Doutorado' },
    { id: '7', nivel: 'Outros' },
  ];

  conclusoes = [
    { id: 'I', resp: 'Incompleto' },
    { id: 'A', resp: 'Em andamento' },
    { id: 'C', resp: 'Concluído' }
  ];

  tipoIdioma = [

    { id: '1', nome: 'Inglês' },
    { id: '2', nome: 'Espanhol' },
    { id: '3', nome: 'Japonês' },
    { id: '4', nome: 'Frânces' },
    { id: '5', nome: 'Italiano' },
    { id: '6', nome: 'Alemão' }

  ];

  constructor() { }

  ngOnInit() {
  }

}
