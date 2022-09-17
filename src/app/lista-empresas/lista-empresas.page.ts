import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.page.html',
  styleUrls: ['./lista-empresas.page.scss'],
})
export class ListaEmpresasPage implements OnInit {

  isModalOpen = false;

  public empresas = [
    {
      nomeEmpresa: 'Riachuelo',
      nomeFantasia: 'RCHL',
      contato:'456123',
      cnpj:'1245145/0001-01',
      email:'riachuelo@rchl.com',
      dtAbertura:'01/01/1980',
      cnae:'14563214',
      situacao:'ativa',
      natureza:'roupas',
      cep:'16058800',
      end:'marechal deodoro',
      nmr:'01',
      bairro:'centro',
      cidade:'Araçatuba',
      estado:'SP',
      contato2:'123123200',
      descricao: 'Teste 2',
      aceita: true,
      recusada: false,
      ramo: 'Teste',
    },
    {
      nomeEmpresa: 'Bandeirantes',
      nomeFantasia: 'Bem mais barato',
      contato:'34411000',
      cnpj:'1584523698/0001-20',
      email:'bandeirantes@band.com',
      dtAbertura:'01/02/1985',
      cnae:'147852456',
      situacao:'Ativo',
      natureza:'Alimentícia',
      cep:'023412587',
      end:'Joao Galo',
      nmr:'1000',
      bairro:'Centro',
      cidade:'Birigui',
      estado:'SP',
      contato2:'34411001',
      descricao: '',
      aceita: false,
      recusada: false,
    },
    {
      nomeEmpresa: 'Amigao',
      nomeFantasia: 'Inimigo',
      contato:'34411000',
      cnpj:'1584523698/0001-30',
      email:'amigao@amg.com',
      dtAbertura:'01/02/1985',
      cnae:'147852455',
      situacao:'Ativo',
      natureza:'Alimentícia',
      cep:'023412589',
      end:'Galo',
      nmr:'102',
      bairro:'Centro',
      cidade:'Birigui',
      estado:'SP',
      contato2:'34411051',
      descricao: '',
      aceita: false,
      recusada: true,
    },
    {
      nomeEmpresa: 'Jardim',
      nomeFantasia: 'encantado',
      contato:'34411045',
      cnpj:'1584523698/0001-50',
      email:'bjardim@jd.com',
      dtAbertura:'01/02/1985',
      cnae:'147852420',
      situacao:'Ativo',
      natureza:'Alimentícia',
      cep:'023412587',
      end:'avenida',
      nmr:'1000',
      bairro:'Centro',
      cidade:'Birigui',
      estado:'SP',
      contato2:'34411042',
      descricao: '',
      aceita: false,
      recusada: false,
    },

  ]
  constructor(public mensagem: AlertController, public toast: ToastController) {}

  abreModal(open: boolean){
    this.isModalOpen = open;
  }

  async aceitar(empresa){
    const aceitar = await this.mensagem.create(
      {
        header: 'ATENÇÃO',
        message: 'Deseja aceitar a empresa' + empresa.nomeEmpresa + '? \nEsta decisão é irreversível'!,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Aceitar',            
            handler: (senha) => {
              if(senha [0] === ''){
                this.exibeToast('Necessário informar a senha', 'warning');
              }else if(senha [0] !== '123456'){
                this.exibeToast('Senha incorreta', 'danger');
              }else{
                empresa.aceita = true;
                empresa.recusada = false;
                this.empresas[this.empresas.indexOf(empresa)] = empresa;
                this.exibeToast('Empresa aceita!', 'success');
              }
            },
          },
        ],
        inputs: [
          {
            placeholder: 'Senha',
            attributes: {
              maxlenght: 50,
            },
            type: 'password'
          },
        ],
      });

      await aceitar.present();
    }

    async rejeitar(empresa){
      const rejeitar = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Deseja rejeitara empresa' + empresa.nomeEmpresa + '? \nEsta decisão é irreversível'!,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Rejeitar',            
              handler: (senha) => {
                if(senha [0] === ''){
                  this.exibeToast('Necessário informar a senha', 'warning');
                }else if(senha [0] !== '123456'){
                  this.exibeToast('Senha incorreta', 'danger');
                }else{
                  empresa.aceita = false;
                  empresa.recusada = true;
                  this.empresas[this.empresas.indexOf(empresa)] = empresa;
                  this.exibeToast('Empresa recusada!', 'success');
                }
              },
            },
          ],
          inputs: [
            {
              placeholder: 'Senha',
              attributes: {
                maxlenght: 50,
              },
              type: 'password'
            },
          ],
        });
  
        await rejeitar.present();
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

  ngOnInit() {
  }

}
