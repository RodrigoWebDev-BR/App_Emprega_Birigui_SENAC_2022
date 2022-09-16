import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  
  public usuarios = [
    {
      nome:'Patrick',
      contato:'123456789',
      contado2:'12345678',
      email:'teste@teste',
      cpf:'123456789-10',
      dtNascimento:'01/01/1992',
      genero:'Masculino',
      eCivil:'Casado',
      cep:'00000-000',
      end:'Rua do churrasquinho',
      nmr:'0000',
      bairro:'Bairro C#',
      cidade:'Araçatuba',
      estado:'SP',
      idAccordion:'1_id'

    },
    {
      nome:'Gustavo',
      contato:'123456789',
      contado2:'12345678',
      email:'teste2@teste',
      cpf:'123456789-10',
      dtNascimento:'01/01/1992',
      genero:'Masculino',
      eCivil:'Casado',
      cep:'00000-000',
      end:'Rua do churrasquinho',
      nmr:'0000',
      bairro:'Bairro C#',
      cidade:'Araçatuba',
      estado:'SP',
      idAccordion:'2_id'

    },
    {
      nome:'João',
      contato:'123456789',
      contado2:'12345678',
      email:'teste3@teste',
      cpf:'123456789-10',
      dtNascimento:'01/01/1992',
      genero:'Masculino',
      eCivil:'Casado',
      cep:'00000-000',
      end:'Rua do churrasquinho',
      nmr:'0000',
      bairro:'Bairro C#',
      cidade:'Araçatuba',
      estado:'SP',
      idAccordion:'3_id'

    }
  ];

  constructor() {}

  ngOnInit() {}
}
