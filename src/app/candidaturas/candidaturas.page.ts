import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidaturas',
  templateUrl: './candidaturas.page.html',
  styleUrls: ['./candidaturas.page.scss'],
})
export class CandidaturasPage implements OnInit {

  isModalOpen=false

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
      aceita:false,
      recusa:true

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
      aceita:true,
      recusa:false

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
      aceita:false,
      recusa:false

    }
  ];

  constructor(public mensagem: AlertController) { }

  abreModal(open: boolean){
    this.isModalOpen = open;
  }

  async convidar(usuario){
    const alerta = await this.mensagem.create(
      {
        header: 'ATENÇÃO!',
        message: 'Deseja convidar o '+ usuario.nome +' para a vaga?',
        buttons: [
          {
            text:'Cancelar',
            role:'cancel',
            handler: () => {},
          },
          {
            text: 'Convidar',
            handler: () => {
              usuario.aceita = true;
              usuario.recusa = false;
              this.usuarios[this.usuarios.indexOf(usuario)] = usuario;
            },
          }
        ]
      }
    )

    await alerta.present();
  }

  async rejeitar(usuario){
    const alerta = await this.mensagem.create(
      {
        header: 'ATENÇÃO!',
        message: 'Deseja rejeitar o '+ usuario.nome +' para a vaga? Este processo é irreversível',
        buttons: [
          {
            text:'Cancelar',
            role:'cancel',
            handler: () => {},
          },
          {
            text: 'Rejeitar',
            handler: () => {
              usuario.aceita = false;
              usuario.recusa = true;
              this.usuarios[this.usuarios.indexOf(usuario)] = usuario;
            },
          }
        ]
      }
    )

    await alerta.present();
  }

  ngOnInit() {
  }

}
