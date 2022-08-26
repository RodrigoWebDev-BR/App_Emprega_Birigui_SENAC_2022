import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.page.html',
  styleUrls: ['./lista-empresas.page.scss'],
})
export class ListaEmpresasPage implements OnInit {
  public empresas = [
    {
      nomeEmpresa: 'chocolates.ltda',
      nomeFantasia: 'Chocolatinhos shelby',
      contato: '(21)123456789',
      cnpj: '12345678910125',
      email: 'teste@teste',
      dtAbertura: '22/02/2022',
      cnae: '1234567895',
      situacao: 'ativa',
      natureza: 'teste nt',
      cep: '00000-000',
      end: 'Rua dos Alfeneiros',
      nmr: '4',
      bairro: 'Morro do Alemão',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      contato2: '(21)12345678',
      aceita: true,
      recusada: false,
      idAccordion: '1_id',
      ramo:'Alimentício',
      descricao:'Chocolatinhos deliciosos'

    },
    {
      nomeEmpresa: 'churrasco.ltda',
      nomeFantasia: 'Espetinhos shelby',
      contato: '(21)123456789',
      cnpj: '12345678910125',
      email: 'teste@teste',
      dtAbertura: '22/02/2022',
      cnae: '1234567895',
      situacao: 'ativa',
      natureza: 'teste nt',
      cep: '00000-000',
      end: 'Rua dos Alfeneiros',
      nmr: '5',
      bairro: 'Morro do Alemão',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      contato2: '(21)12345678',
      aceita: false,
      recusada: false,
      idAccordion: '2_id',
      ramo:'Alimentício',
      descricao:'Churrasquinho com cerveja'
    },
    {
      nomeEmpresa: 'sorvete.ltda',
      nomeFantasia: 'Sorvetinhos shelby',
      contato: '(21)123456789',
      cnpj: '12345678910125',
      email: 'teste@teste',
      dtAbertura: '22/02/2022',
      cnae: '1234567895',
      situacao: 'ativa',
      natureza: 'teste nt',
      cep: '00000-000',
      end: 'Rua dos Alfeneiros',
      nmr: '6',
      bairro: 'Morro do Alemão',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      contato2: '(21)12345678',
      aceita: false,
      recusada: true,
      idAccordion: '3_id',
      ramo:'Alimentício',
      descricao:'Sorvete de flocos'
    },
  ];

  constructor(
    public mensagem: AlertController,
    public toast: ToastController
  ) {}

  async aceitar(empresa) {
    const aceitar = await this.mensagem.create({
      header: 'Atenção',
      message:
        'Deseja aceitar a empresa' +
        empresa.nomeEmpresa +
        '? Está decisão é irreversível',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: (senha) => {
            if (senha[0] === '') {
              this.exibeToast('Necessário informar a senha', 'warning');
            } else if (senha[0] !== '123456') {
              this.exibeToast('Senha incorreta', 'danger');
            } else {
              empresa.aceita = true;
              empresa.recusada = false;
              this.empresas[this.empresas.indexOf(empresa)] = empresa;
              this.exibeToast('Empresa aceita', 'success');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Senha',
          attributes: {
            maxlength: 50,
          },
          type: 'password'
        },
      ],
    });

    await aceitar.present();
    return;
  }

  async rejeitar(empresa) {
    const aceitar = await this.mensagem.create({
      header: 'Atenção',
      message:
        'Deseja rejeitar a empresa' +
        empresa.nomeEmpresa +
        '? Está decisão é irreversível',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: (senha) => {
            if (senha[0] === '') {
              this.exibeToast('Necessário informar a senha', 'warning');
            } else if (senha[0] !== '123456') {
              this.exibeToast('Senha incorreta', 'danger');
            } else {
              empresa.aceita = false;
              empresa.recusada = true;
              this.empresas[this.empresas.indexOf(empresa)] = empresa;
              this.exibeToast('Empresa Recusada', 'success');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Senha',
          attributes: {
            maxlength: 50,
          },
          type: 'password'
        },
      ],
    });

    await aceitar.present();
    return;
  }

  async exibeToast(msg, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }

  ngOnInit() {}
}
