import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidaturas',
  templateUrl: './candidaturas.page.html',
  styleUrls: ['./candidaturas.page.scss'],
})
export class CandidaturasPage implements OnInit {
  isModalOpen = true;
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
      descricao: 'Moro ao lado do asilo',
      aceita: true,
      recusada: false
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
      estado: 'SP',
      descricao: 'Moro la no aguas claras e sou da correria',
      aceita: false,
      recusada: true
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
      descricao: 'Sou de birigui, menti que sou de araçatuba',
      aceita: false,
      recusada: false
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
      descricao: 'Mommy spaghet',
      aceita: true,
      recusada: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
