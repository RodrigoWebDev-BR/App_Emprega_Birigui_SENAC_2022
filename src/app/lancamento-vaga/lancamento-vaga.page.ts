import { EmpresaService } from 'src/app/servicos/empresa.service';
import { validarCNPJ } from './../../environments/functions';
import {
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-vaga',
  templateUrl: './lancamento-vaga.page.html',
  styleUrls: ['./lancamento-vaga.page.scss'],
})
export class LancamentoVagaPage implements OnInit {
  public beneficios: any[] = [];
  public vaga = {
    nomeEmpresa: '',
    cidade: '',
    tituloVaga: '',
    categoria: '',
    contrato: '',
    prazo: '',
    horario: 0,
    combinado: false,
    salario: 0,
    qualificacao: '',
    alimentacao: false,
    medica: false,
    descricao: '',
    beneficios: this.beneficios,
    congelada: false,
    finalizada: false,
    empresaId: localStorage.getItem('idUser')
  };

  isModalOpen = false;
  public beneficio = '';
  perfil: any = {};
  itemAux: any = {};
  qualificacoes = [
    { nivel: 'Aprendiz maior 14 anos' },
    { nivel: 'Aprendiz maior 16 anos' },
    { nivel: 'Aprendiz maior 18 anos' },
    { nivel: '2º Grau Médio - Cursando' },
    { nivel: '2º Grau Médio - Completo' },
    { nivel: 'Técnologo - Cursando' },
    { nivel: 'Técnologo - Completo' },
    { nivel: 'Ensino Superior - Cursando' },
    { nivel: 'Ensino Superior - Completo' },
    { nivel: 'Pós Graduação - Cursando' },
    { nivel: 'Pós Graduação - Completo' },
    { nivel: 'Mestrado - Cursando' },
    { nivel: 'Mestrado - Completo' },
    { nivel: 'Doutorado - Cursando' },
    { nivel: 'Doutorado - Completo' },
  ];

  categorias = [
    { nome: 'Administrativo' },
    { nome: 'Comércio' },
    { nome: 'Contabilidade' },
    { nome: 'Educação' },
    { nome: 'Entretenimento' },
    { nome: 'Escritório' },
    { nome: 'Farmácia' },
    { nome: 'Financeiro' },
    { nome: 'Jurídico' },
    { nome: 'Limpeza' },
    { nome: 'Linha de produção' },
    { nome: 'Restaurantes' },
    { nome: 'Recursos Humanos' },
    { nome: 'Saúde' },
    { nome: 'Serviços gerais' },
    { nome: 'Supermercado' },
    { nome: 'Tecnologia' }
  ];

  contratos = [{ nome: 'CLT' }, { nome: 'PJ' }, { nome: 'Estágio' }];

  prazos = [{ nome: 'Indeterminado' }, { nome: 'Temporário' }];

  inclusos = [{ nome: 'Incluso', validado: true }, { nome: 'Não incluso', validado: false }];

  // eslint-disable-next-line max-len
  constructor(
    public nav: NavController,
    public mensagem: AlertController,
    public toast: ToastController,
    public servicoEmpresa: EmpresaService
  ) {}

  async addBeneficio() {
    if (this.beneficio === null || this.beneficio === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário acrescentar um título para o benefício da vaga.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      this.beneficios.push(this.beneficio);
      this.beneficio = '';
    }
  }

  async removerBenef(benef) {
    const confirmaRemover = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Confirmar exclusão de ' + benef + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            const index = this.beneficios.indexOf(benef);
            this.beneficios.splice(index, 1);
          },
        },
      ],
    });

    await confirmaRemover.present();
  }

  combinar($event) {
    if ($event.currentTarget.checked) {
      this.vaga.combinado = true;
    } else {
      this.vaga.combinado = false;
    }
  }

  finalizar() {
    this.nav.navigateForward('conclusao-vaga');
  }

  async abreModal(isOpen: boolean) {
    if (this.vaga.tituloVaga === null || this.vaga.tituloVaga === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário informar o título da vaga.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.vaga.categoria === null || this.vaga.categoria === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário informar uma categoria.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.vaga.contrato === null || this.vaga.contrato === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário informar o tipo de contrato.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.vaga.prazo === null || this.vaga.prazo === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário informar o prazo de contrato',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.vaga.horario === 0) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Necessário informar a carga horária semanal.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!this.vaga.combinado && this.vaga.salario === 0) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Se o salário não está a combinar, favor informar o salário',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.vaga.qualificacao === null ||
      this.vaga.qualificacao === ''
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Informe uma qualificação.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.vaga.descricao === null || this.vaga.descricao === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Por favor informe uma descrição sobre a vaga',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      this.isModalOpen = isOpen;

      if (isOpen) {
        setTimeout(() => {
          this.aviso();
        }, 300);
      }
    }
  }

  async aviso() {
    const alerta = await this.mensagem.create({
      header: 'REVISÃO!',
      message:
        // eslint-disable-next-line max-len
        'Por favor revise todos os dados inseridos antes de lançar a vaga!!! \nSe houver alguma alteração necessária, clique em cancelar no botão superior esquerdo',
      buttons: ['ok'],
    });

    await alerta.present();

    return;
  }

  async lancarVaga(vaga) {
    const vagas = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Para lançar a vaga de ' + vaga.tituloVaga + ' insira seu CNPJ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Finalizar',
          handler: (cnpj) => {
            if (validarCNPJ(cnpj[0])) {
              this.servicoEmpresa
                .perfil()
                .then((response) => {
                  this.perfil = response;
                  if (this.perfil !== undefined) {
                    if (cnpj[0] === this.perfil.cnpj) {
                      this.servicoEmpresa
                        .lancaVaga(vaga)
                        .then((finalResp) => {
                          this.itemAux = finalResp;
                          if (this.itemAux === undefined) {
                            this.exibeToast(
                              'Erro para inserir a vaga!',
                              'danger'
                            );
                          } else {
                            // eslint-disable-next-line no-underscore-dangle
                            localStorage.setItem('idVaga', this.itemAux._id);
                            this.nav.navigateRoot('conclusao-vaga');
                          }
                        })
                        .catch((e)=>{
                          console.log(e);
                        });
                    } else {
                      this.exibeToast('CNPJ inválido!', 'warning');
                    }
                  } else {
                    this.exibeToast('Erro com servidor!', 'danger');
                  }
                })
                .catch();
            } else {
              this.exibeToast('CNPJ inválido!', 'warning');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'CNPJ',
          attributes: {
            maxlength: 18,
          },
        },
      ],
    });

    await vagas.present();
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

  perfilEmpresa() {
    this.servicoEmpresa
      .perfil()
      .then((response) => {
        this.perfil = response;
        if (this.perfil === undefined) {
          return;
        } else {
          this.vaga.nomeEmpresa = this.perfil.nomeEmpresa;
          this.vaga.cidade = this.perfil.cidade;
        }
      })
      .catch();
  }

  ngOnInit() {
    this.perfilEmpresa();
  }
}
