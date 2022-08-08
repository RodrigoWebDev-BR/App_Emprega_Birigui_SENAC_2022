import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.page.html',
  styleUrls: ['./lista-empresas.page.scss'],
})
export class ListaEmpresasPage implements OnInit {

  public empresas =[
    {
      nomeEmpresa:'chocolates.ltda',
      nomeFantasia:'Chocolatinhos shelby',
      contato:'(21)123456789',
      cnpj:'12345678910125',
      email:'teste@teste',
      dtAbertura:'22/02/2022',
      cnae:'1234567895',
      situacao:'ativa',
      natureza:'teste nt',
      cep:'00000-000',
      end:'Rua dos Alfeneiros',
      nmr:'4',
      bairro:'Morro do Alemão',
      cidade:'Rio de Janeiro',
      estado:'RJ',
      contato2:'(21)12345678',
      aceita: true,
      recusada:false,
      idAccordion:'1_id'
    },
    {
      nomeEmpresa:'churrasco.ltda',
      nomeFantasia:'Espetinhos shelby',
      contato:'(21)123456789',
      cnpj:'12345678910125',
      email:'teste@teste',
      dtAbertura:'22/02/2022',
      cnae:'1234567895',
      situacao:'ativa',
      natureza:'teste nt',
      cep:'00000-000',
      end:'Rua dos Alfeneiros',
      nmr:'5',
      bairro:'Morro do Alemão',
      cidade:'Rio de Janeiro',
      estado:'RJ',
      contato2:'(21)12345678',
      aceita: false,
      recusada:false,
      idAccordion:'2_id'
    },
    {
      nomeEmpresa:'sorvete.ltda',
      nomeFantasia:'Sorvetinhos shelby',
      contato:'(21)123456789',
      cnpj:'12345678910125',
      email:'teste@teste',
      dtAbertura:'22/02/2022',
      cnae:'1234567895',
      situacao:'ativa',
      natureza:'teste nt',
      cep:'00000-000',
      end:'Rua dos Alfeneiros',
      nmr:'6',
      bairro:'Morro do Alemão',
      cidade:'Rio de Janeiro',
      estado:'RJ',
      contato2:'(21)12345678',
      aceita: false,
      recusada:true,
      idAccordion:'3_id'
    },
  ]
    

  constructor() { }

  ngOnInit() {
  }

}
