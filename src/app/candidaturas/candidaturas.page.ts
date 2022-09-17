import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidaturas',
  templateUrl: './candidaturas.page.html',
  styleUrls: ['./candidaturas.page.scss'],
})
export class CandidaturasPage implements OnInit {


  isModalOpen = false;

  public candidatos = [
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
      descrição: 'Gosta da véia',
      aceito: true,
      recusado: false
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
      descrição: 'Gosta de chocolatinho',
      aceito: false,
      recusado: true
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
      descrição: 'Chegado na cachaça',
      aceito: true,
      recusado: false
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
      descrição: 'Mata aula para um churrasquinho',
      aceito: false,
      recusado: false
    },
  ];

  constructor(public mensagem: AlertController) {}

  abreModal(open: boolean){
    this.isModalOpen = open;
  }

 async convidar(candidato){
    const alerta = await this.mensagem.create(
      {
        header: 'ATENÇÃO',
        message: 'Deseja convidar ' + candidato.nome + ' para a vaga?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Convidar',            
            handler: () => {
              candidato.aceito = true;
              candidato.recusado = false;
              this.candidatos[this.candidatos.indexOf(candidato)] = candidato;
            },
          },
        ],
      });

      await alerta.present();
    }

    async rejeitar(candidato){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Deseja rejeitar ' + candidato.nome + ' para a vaga? Este processo é irreversível',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Rejeitar',            
              handler: () => {
                candidato.aceito = false;
                candidato.recusado = true;
                this.candidatos[this.candidatos.indexOf(candidato)] = candidato;
              },
            },
          ],
        });
  
        await alerta.present();
      } 

  ngOnInit() {}

 }
