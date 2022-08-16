import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.page.html',
  styleUrls: ['./lista-empresas.page.scss'],
})
export class ListaEmpresasPage implements OnInit {
  public empresas = [
    {
      nomeEmpresa: 'Riachuelo',
      nomeFantasia: 'RCHL',
      contato: '(15)654689486',
      cnpj: '143480001/048',
      email: 'riachelo@gmail.com',
      dtAbertura: '01/01/2000',
      cnae: '65461648',
      situacao: 'ativa',
      natureza: 'funcional',
      cep: '4894161565',
      end: 'rua riachuelo',
      nmr: '165',
      bairro: 'centro',
      cidade: 'Araçatuba',
      estado: 'SP',
      contato2: '(18)487168119',
      aceita: true,
      recusada: false,
      idAccordion: '1_id'
    },
    {
      nomeEmpresa: 'Amigão',
      nomeFantasia: 'supermeracados',
      contato: '(18)3622-6464',
      cnpj: '15648943',
      email: 'amigao@gmail.com',
      dtAbertura: '01/01/2010',
      cnae: '484318321',
      situacao: 'ativo',
      natureza: 'funcional',
      cep: '65146543',
      end: 'rua do mercado',
      nmr: '123',
      bairro: 'jardins',
      cidade: 'Birigui',
      estado: 'SP',
      contato2: '(18) 98123132',
      aceita: false,
      recusada: false,
      idAccordion: '2_id'
    },
    {
      nomeEmpresa: 'Açai',
      nomeFantasia: 'açai',
      contato: '1981351651',
      cnpj: '156132486',
      email: 'acaiteria@gmail.com',
      dtAbertura: '01/01/2010',
      cnae: '484318321',
      situacao: 'ativo',
      natureza: 'funcional',
      cep: '65146543',
      end: 'rua do mercado',
      nmr: '123',
      bairro: 'jardins',
      cidade: 'Birigui',
      estado: 'SP',
      contato2: '(18) 98123132',
      aceita: false,
      recusada: true,
      idAccordion: '3_id'
    },
    {
      nomeEmpresa: 'Klin',
      nomeFantasia: 'sapatos Klin',
      contato: '(18) 95615645',
      cnpj: '16516513',
      email: 'klin@gmail.com',
      dtAbertura: '01/01/2010',
      cnae: '484318321',
      situacao: 'ativo',
      natureza: 'funcional',
      cep: '65146543',
      end: 'rua do mercado',
      nmr: '123',
      bairro: 'jardins',
      cidade: 'Birigui',
      estado: 'SP',
      contato2: '(18) 98123132',
      aceita: false,
      recusada: false,
      idAccordion: '4_id'
    },
  ];

  constructor(public mensagem: AlertController) {}

  async aceitar(empresa){
    const aceitar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Deseja aceitar a empresa ' + empresa.nomeEmpresa + '? \nEsta decisão é irreversível!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Aceitar',
          handler: () => {
            empresa.aceita = true;
            empresa.recusada = false;
            this.empresas[this.empresas.indexOf(empresa)] = empresa;
          },
        },
      ],
    });

    await aceitar.present();
  }

  async rejeitar(empresa){
    const rejeitar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Deseja rejeitar a empresa ' + empresa.nomeEmpresa + '? \nEsta decisão é irreversível!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Rejeitar',
          handler: () => {
            empresa.aceita = false;
            empresa.recusada = true;
            this.empresas[this.empresas.indexOf(empresa)] =
              empresa;
          },
        },
      ],
    });

    await rejeitar.present();
  }

  ngOnInit() {}
}
