import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  public usuarios = [
    {
      nome: 'Diego',
      contato: '1684565616',
      contato2: '46464646',
      email: 'diego-PKblinder@gmail.com',
      cpf: '4564654564-65',
      dtNascimento: '01/01/2005',
      genero: 'masculino',
      eCivil: 'solteiro',
      cep: '1661616',
      end: 'rua da exposição',
      nmr: '120',
      bairro: 'santana',
      cidade: 'Araçatuba',
      estado: 'SP',
      idAccordion: '1_id'
    },
    {
      nome: 'João do chocolate',
      contato: '89189948',
      contato2: '16548431',
      email: 'cacaushow@gmail.com',
      cpf: '54982319849-85',
      dtNascimento: '24/07/1992',
      genero: 'Indefinido',
      eCivil: 'Casado',
      cep: '16125198',
      end: 'rua perto do thauã',
      nmr: '120',
      bairro: 'Sumaré',
      cidade: 'birigui',
      estado: 'SP'
    },
    {
      nome: 'Rodrigo',
      contato: '14613186',
      contato2: '18412351486',
      email: 'birigui-klin@gmail.com',
      cpf: '456465454-56',
      dtNascimento: '18/09/2001',
      genero: 'Masculino',
      eCivil: 'Divorciado',
      cep: '161561566',
      end: 'rua de birigui',
      nmr: '500',
      bairro: 'jardim birigui',
      cidade: 'birigui',
      estado: 'SP',
      idAccordion: '3_id'
    },
    {
      nome: 'Eminem',
      contato: '14613186',
      contato2: '18412351486',
      email: 'slinShady@gmail.com',
      cpf: '456465454-56',
      dtNascimento: '18/09/2001',
      genero: 'Masculino',
      eCivil: 'Divorciado',
      cep: '161561566',
      end: 'rua de nova york',
      nmr: '500',
      bairro: 'jardim birigui',
      cidade: 'nova york',
      estado: 'NY',
      idAccordion: '4_id'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
