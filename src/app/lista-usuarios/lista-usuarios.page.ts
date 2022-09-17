import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  constructor() {}

  public usuarios = [
    {
      nome: 'Diego da Véia',
      contato: '1899999999',
      contato2: '984569898',
      email: 'diego@veia.com',
      cpf: '65156456-55',
      dtNascimento: '02/02/2005',
      genero: 'Masculino',
      eCivil: 'Solteiro',
      cep: '16100250',
      end: 'Rua tal',
      nmr: '10',
      bairro: 'velho',
      cidade: 'Aca',
      estado: 'SP',
      idAccordion: '1_id'
    },
    {
      nome: 'Joao do Chocolate',
      contato: '15915126165',
      contato2: '51545616164',
      email: 'joao@chocolatinho.com',
      cpf: '123456123-55',
      dtNascimento: '22/06/1999',
      genero: 'Masculino',
      eCivil: 'Casado',
      cep: '16056159',
      end: 'Rua 1',
      nmr: '10567',
      bairro: 'Sei la',
      cidade: 'Araçatuba',
      estado: 'SP',
      idAccordion: '2_id'
    },
    {
      nome: 'Budega',
      contato: '216549815616',
      contato2: '216545616',
      email: 'budega@budega.com',
      cpf: '2161516549-74',
      dtNascimento: '10/11/1990',
      genero: 'Feminino',
      eCivil: 'solteiro',
      cep: '16150200',
      end: 'Rua 3',
      nmr: '100',
      bairro: 'Proibido',
      cidade: 'Birigui',
      estado: 'SP',
      idAccordion: '3_id'
    },

    {
      nome: 'Thauã do Churrasquinho',
      contato: '987456321',
      contato2: '741852963',
      email: 'thaua@churras.com',
      cpf: '4151516549-80',
      dtNascimento: '10/11/1990',
      genero: 'Masculino',
      eCivil: 'solteiro',
      cep: '16150200',
      end: 'Rua 7',
      nmr: '100',
      bairro: 'Longe',
      cidade: 'Araçatuba',
      estado: 'SP',
      idAccordion: '4_id'
    },
  ];

  ngOnInit() {}
}
