import { CepService } from './../servicos/cep.service';
import { validaEmail } from 'src/environments/functions';
import {
  formatarCPF,
  formatarRG,
  validaCPF,
} from './../../environments/functions';
import { AlertController, ToastController } from '@ionic/angular';
import { EmpregadoService } from './../servicos/empregado.service';
import { EmpresaService } from './../servicos/empresa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.page.html',
  styleUrls: ['./curriculo.page.scss'],
})
export class CurriculoPage implements OnInit {
  empresa = false;
  empregado = false;
  perfil: any = {};
  itemAux: any = {};
  contatoPrincipal: string;
  modal = {
    modalPessoalEmpregado: false,
    modalPessoalEmpresa: false,
    modalEndereco: false,
    modalContatos: false,
    modalFormacao: false,
    modalExp: false,
    modalCursos: false,
    modalIdiomas: false,
  };

  public resultSubDoc: any[];

  public dadosEmpregado = {
    nome: '',
    email: '',
    rg: '',
    cpf: '',
    estadoCivil: '',
  };

  public dadosEmpresa = {
    fantasia: '',
    email: '',
    cnpj: '',
    cnae: '',
    situacao: '',
    natureza: '',
    ramo: '',
  };

  public enderecos = {
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  };

  public contatos = {
    tipo: '',
    contato: '',
  };

  public estadoCivil = [
    { id: '1', estadoAtual: 'Solteiro(a)' },
    { id: '2', estadoAtual: 'Casado(a)' },
    { id: '3', estadoAtual: 'União Estável' },
    { id: '4', estadoAtual: 'Divorciado(a)' },
    { id: '5', estadoAtual: 'Viúvo(a)' },
  ];

  public tipoContato = [
    { id: '1', nome: 'Celular' },
    { id: '2', nome: 'Telefone' },
    { id: '3', nome: 'LinkedIn' },
    { id: '4', nome: 'Instagram' },
    { id: '5', nome: 'Facebook' },
  ];

  public formacoes = [
    { id: '1', nivel: '2º Grau Médio' },
    { id: '2', nivel: 'Técnologo' },
    { id: '3', nivel: 'Ensino Superior' },
    { id: '4', nivel: 'Pós Graduação' },
    { id: '5', nivel: 'Mestrado' },
    { id: '6', nivel: 'Doutorado' },
    { id: '7', nivel: 'Outros' },
  ];

  public conclusoes = [
    { id: 'I', resp: 'Incompleto' },
    { id: 'A', resp: 'Em andamento' },
    { id: 'C', resp: 'Concluído' },
  ];

  public tipoIdioma = [
    { id: '1', nome: 'Inglês' },
    { id: '2', nome: 'Espanhol' },
    { id: '3', nome: 'Japonês' },
    { id: '4', nome: 'Frânces' },
    { id: '5', nome: 'Italiano' },
    { id: '6', nome: 'Alemão' },
  ];

  public situacoes = [
    { id: '1', sitAtual: 'Ativo(a)' },
    { id: '2', sitAtual: 'Inativo(a)' },
  ];

  public naturezas = [
    { id: '1', naturezas: 'Perfil Subjetivo' },
    { id: '2', naturezas: 'Perfil Funcional' },
    { id: '3', naturezas: 'Perfil Objetivo ou Patrimonial' },
    { id: '4', naturezas: 'Perfil Corporativo' },
  ];

  public ramos = [
    { id: '1', nome: 'Alimentos' },
    { id: '2', nome: 'Entretenimento' },
    { id: '3', nome: 'Contabilidade' },
    { id: '4', nome: 'Escritório' },
    { id: '5', nome: 'Instituto educacional' },
    { id: '6', nome: 'Linha de produção' },
    { id: '7', nome: 'Moda' },
    { id: '8', nome: 'Postos de combustíveis' },
    { id: '9', nome: 'Recursos Humanos' },
    { id: '10', nome: 'Supermercado' },
    { id: '11', nome: 'Tecnologia' },
    { id: '12', nome: 'Varejo' },
    { id: '13', nome: 'Outros' },
  ];

  constructor(
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService,
    public mensagem: AlertController,
    public toast: ToastController,
    public cep: CepService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('profile') === 'empresa') {
      this.perfilEmpresa('');
    } else if (localStorage.getItem('profile') === 'empregado') {
      this.perfilEmpregado('');
    }
  }

  perfilEmpregado(aux: string) {
    this.empregado = true;
    this.servicoEmpregado
      .perfil()
      .then((response) => {
        this.perfil = response;

        this.loadContato(this.perfil);
        if (this.perfil === undefined) {
          return;
        } else {
          this.loadContato(this.perfil);
          if (aux === 'pessoal') {
            this.dadosEmpregado.nome = this.perfil.nome;
            this.dadosEmpregado.rg = this.perfil.rg;
            this.dadosEmpregado.cpf = this.perfil.cpf;
            this.dadosEmpregado.email = this.perfil.email;
            this.dadosEmpregado.estadoCivil = this.perfil.estadoCivil;
          } else if (aux === 'endereco') {
            this.enderecos.cep = this.perfil.cep;
            this.enderecos.endereco = this.perfil.endereco;
            this.enderecos.numero = this.perfil.numero;
            this.enderecos.complemento = this.perfil.complemento;
            this.enderecos.bairro = this.perfil.bairro;
            this.enderecos.cidade = this.perfil.cidade;
            this.enderecos.estado = this.perfil.estado;
          }
        }
      })
      .catch();
  }

  perfilEmpresa(aux: string) {
    this.empresa = true;
    this.servicoEmpresa
      .perfil()
      .then((response) => {
        this.perfil = response;

        this.loadContato(this.perfil);
        if (this.perfil === undefined) {
          return;
        } else {
          this.loadContato(this.perfil);

          if (aux === 'pessoalEmpresa') {
            this.dadosEmpresa.fantasia = this.perfil.fantasia;
            this.dadosEmpresa.email = this.perfil.email;
            this.dadosEmpresa.cnpj = this.perfil.cnpj;
            this.dadosEmpresa.cnae = this.perfil.cnae;
            this.dadosEmpresa.situacao = this.perfil.situacao;
            this.dadosEmpresa.natureza = this.perfil.natureza;
            this.dadosEmpresa.ramo = this.perfil.ramo;
          } else if (aux === 'endereco') {
            this.enderecos.cep = this.perfil.cep;
            this.enderecos.endereco = this.perfil.endereco;
            this.enderecos.numero = this.perfil.numero;
            this.enderecos.complemento = this.perfil.complemento;
            this.enderecos.bairro = this.perfil.bairro;
            this.enderecos.cidade = this.perfil.cidade;
            this.enderecos.estado = this.perfil.estado;
          }
        }
      })
      .catch();
  }

  loadContato(perfil: any) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < perfil.contatos.length; i++) {
      const element = perfil.contatos[i];
      if (element.tipo === 'Celular') {
        this.contatoPrincipal = element.contato;
      }
    }
  }

  async removerDados(item, sessao: string) {
    switch (sessao) {
      case 'contatos':
        const removeContato = await this.mensagem.create({
          header: 'ATENÇÃO',
          message:
            'Confirma a exclusão do ' + item.tipo + ' - ' + item.contato + '?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Sim',
              handler: () => {
                if (localStorage.getItem('profile') === 'empregado') {
                  this.servicoEmpregado
                    .searchSubDoc(sessao)
                    .then((resp) => {
                      this.itemAux = resp;
                      if (this.itemAux === undefined) {
                        return;
                      } else {
                        const colecao: any[] = JSON.parse(
                          JSON.stringify(
                            this.itemAux.filter(
                              // eslint-disable-next-line no-underscore-dangle
                              (contatos) => contatos._id !== item._id
                            )
                          )
                        );

                        this.servicoEmpregado
                          .patchUser(colecao, sessao)
                          .then((respFinal) => {
                            if (!respFinal) {
                              return;
                            } else {
                              this.perfilEmpregado('');
                            }
                          })
                          .catch();
                      }
                    })
                    .catch();
                } else {
                  this.servicoEmpresa
                    .searchSubDoc(sessao)
                    .then((resp) => {
                      this.itemAux = resp;
                      if (this.itemAux === undefined) {
                        return;
                      } else {
                        const colecao: any[] = JSON.parse(
                          JSON.stringify(
                            this.itemAux.filter(
                              // eslint-disable-next-line no-underscore-dangle
                              (contatos) => contatos._id !== item._id
                            )
                          )
                        );
                        this.servicoEmpresa
                          .patchEmpresa(colecao, 'contatos')
                          .then((respFinal) => {
                            if (!respFinal) {
                              return;
                            } else {
                              this.perfilEmpresa('');
                            }
                          })
                          .catch();
                      }
                    })
                    .catch();
                }
              },
            },
          ],
        });
        await removeContato.present();
        break;

      case 'formacaoEdu':
        const removeFormacao = await this.mensagem.create({
          header: 'ATENÇÃO',
          message: 'Confirma a exclusão da formação ' + item.instituicao + '?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Sim',
              handler: () => {
                this.servicoEmpregado
                  .searchSubDoc(sessao)
                  .then((resp) => {
                    this.itemAux = resp;
                    if (this.itemAux === undefined) {
                      return;
                    } else {
                      const colecao: any[] = JSON.parse(
                        JSON.stringify(
                          this.itemAux.filter(
                            // eslint-disable-next-line no-underscore-dangle
                            (formacoes) => formacoes._id !== item._id
                          )
                        )
                      );

                      this.servicoEmpregado
                        .patchUser(colecao, sessao)
                        .then((respFinal) => {
                          if (!respFinal) {
                            return;
                          } else {
                            this.perfilEmpregado('');
                          }
                        })
                        .catch();
                    }
                  })
                  .catch();
              },
            },
          ],
        });
        await removeFormacao.present();
        break;

      case 'expProfissional':
        const removeExp = await this.mensagem.create({
          header: 'ATENÇÃO',
          message:
            'Confirma a exclusão da experiência' +
            item.empresa +
            ' - ' +
            item.cargo +
            '?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Sim',
              handler: () => {
                this.servicoEmpregado
                  .searchSubDoc(sessao)
                  .then((resp) => {
                    this.itemAux = resp;
                    if (this.itemAux === undefined) {
                      return;
                    } else {
                      const colecao: any[] = JSON.parse(
                        JSON.stringify(
                          this.itemAux.filter(
                            // eslint-disable-next-line no-underscore-dangle
                            (exp) => exp._id !== item._id
                          )
                        )
                      );

                      this.servicoEmpregado
                        .patchUser(colecao, sessao)
                        .then((respFinal) => {
                          if (!respFinal) {
                            return;
                          } else {
                            this.perfilEmpregado('');
                          }
                        })
                        .catch();
                    }
                  })
                  .catch();
              },
            },
          ],
        });
        await removeExp.present();
        break;

      case 'cursos':
        const removeCurso = await this.mensagem.create({
          header: 'ATENÇÃO',
          message: 'Confirma a exclusão do idioma ' + item.nome + '?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Sim',
              handler: () => {
                this.servicoEmpregado
                  .searchSubDoc(sessao)
                  .then((resp) => {
                    this.itemAux = resp;
                    if (this.itemAux === undefined) {
                      return;
                    } else {
                      const colecao: any[] = JSON.parse(
                        JSON.stringify(
                          this.itemAux.filter(
                            // eslint-disable-next-line no-underscore-dangle
                            (curso) => curso._id !== item._id
                          )
                        )
                      );

                      this.servicoEmpregado
                        .patchUser(colecao, sessao)
                        .then((respFinal) => {
                          if (!respFinal) {
                            return;
                          } else {
                            this.perfilEmpregado('');
                          }
                        })
                        .catch();
                    }
                  })
                  .catch();
              },
            },
          ],
        });
        await removeCurso.present();
        break;

      case 'idiomas':
        const removeIdioma = await this.mensagem.create({
          header: 'ATENÇÃO',
          message: 'Confirma a exclusão do ' + item.idioma + '?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Sim',
              handler: () => {
                this.servicoEmpregado
                  .searchSubDoc(sessao)
                  .then((resp) => {
                    this.itemAux = resp;
                    if (this.itemAux === undefined) {
                      return;
                    } else {
                      const colecao: any[] = JSON.parse(
                        JSON.stringify(
                          this.itemAux.filter(
                            // eslint-disable-next-line no-underscore-dangle
                            (idioma) => idioma._id !== item._id
                          )
                        )
                      );

                      this.servicoEmpregado
                        .patchUser(colecao, sessao)
                        .then((respFinal) => {
                          if (!respFinal) {
                            return;
                          } else {
                            this.perfilEmpregado('');
                          }
                        })
                        .catch();
                    }
                  })
                  .catch();
              },
            },
          ],
        });
        await removeIdioma.present();
        break;
    }
  }

  //! #region ValidaDados
  async updateDados() {
    if (this.dadosEmpregado.nome === '' || this.dadosEmpregado.nome === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o nome.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (
      this.dadosEmpregado.rg === '' ||
      this.dadosEmpregado.rg === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o RG.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpregado.cpf === '' ||
      this.dadosEmpregado.cpf === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o CPF.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpregado.email === '' ||
      this.dadosEmpregado.email === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o E-Mail.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpregado.estadoCivil === '' ||
      this.dadosEmpregado.estadoCivil === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o estado civil atual.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!validaCPF(this.dadosEmpregado.cpf)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'CPF inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!validaEmail(this.dadosEmpregado.email)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'E-Mail inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      // eslint-disable-next-line max-len
      this.servicoEmpregado
        .patchUser(this.dadosEmpregado, '')
        .then((resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            this.exibeToast(
              'Não foi possível concluir a alteração.',
              'confirma'
            );
            return;
          } else {
            this.perfilEmpregado('pessoal');
            this.abreModal(false, 'pessoal');
            this.exibeToast('Alteração concluída!', 'confirma');
          }
        })
        .catch();
    }
  }

  async updateDadosEmpresa() {
    if (
      this.dadosEmpresa.fantasia === '' ||
      this.dadosEmpresa.fantasia === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o nome fantasia.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (
      this.dadosEmpresa.email === '' ||
      this.dadosEmpresa.email === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o email..',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpresa.cnpj === '' ||
      this.dadosEmpresa.cnpj === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o CNPJ.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpresa.cnae === '' ||
      this.dadosEmpresa.cnae === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o CNAE.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpresa.situacao === '' ||
      this.dadosEmpresa.situacao === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a situação da empresa.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpresa.natureza === '' ||
      this.dadosEmpresa.natureza === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a natureza.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (
      this.dadosEmpresa.ramo === '' ||
      this.dadosEmpresa.ramo === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar um ramo empresarial.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (!validaEmail(this.dadosEmpresa.email)) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'E-Mail inválido.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      // eslint-disable-next-line max-len
      this.servicoEmpresa
        .patchEmpresa(this.dadosEmpresa, '')
        .then((resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            this.exibeToast(
              'Não foi possível concluir a alteração.',
              'confirma'
            );
            return;
          } else {
            this.perfilEmpresa('pessoalEmpresa');
            this.abreModal(false, 'pessoalEmpresa');
            this.exibeToast('Alteração concluída!', 'confirma');
          }
        })
        .catch();
    }
  }

  async updateDadosEndereco() {
    if (this.perfil.cep === '' || this.perfil.cep === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o CEP.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.perfil.endereco === '' || this.perfil.endereco === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o endereço.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.perfil.numero === '' || this.perfil.numero === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o numero.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.perfil.bairro === '' || this.perfil.bairro === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o bairro.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.perfil.cidade === '' || this.perfil.cidade === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar a cidade.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else if (this.perfil.estado === '' || this.perfil.estado === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o estado.',
        buttons: ['ok'],
      });

      await alerta.present();

      return;
    } else {
      if (localStorage.getItem('profile') === 'empregado') {
        this.servicoEmpregado
          .patchUser(this.enderecos, '')
          .then((resp) => {
            this.itemAux = resp;
            if (this.itemAux === undefined) {
              this.exibeToast(
                'Não foi possível concluir a alteração.',
                'confirma'
              );
              return;
            } else {
              this.perfilEmpregado('');
              this.exibeToast('Alteração concluída!', 'confirma');
            }
          })
          .catch();
      } else {
        this.servicoEmpresa
          .patchEmpresa(this.enderecos, '')
          .then((resp) => {
            this.itemAux = resp;
            if (this.itemAux === undefined) {
              this.exibeToast(
                'Não foi possível concluir a alteração.',
                'confirma'
              );
              return;
            } else {
              this.perfilEmpresa('');
              this.exibeToast('Alteração concluída!', 'confirma');
            }
          })
          .catch();
      }

      this.abreModal(false, 'endereco');
    }
  }

  async addContatos() {
    if (this.contatos.tipo === '' || this.contatos.tipo === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o tipo de contato.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else if (this.contatos.contato === '' || this.contatos.contato === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'É necessário informar o seu contato.',
        buttons: ['ok'],
      });
      await alerta.present();

      return;
    } else {
      if (localStorage.getItem('profile') === 'empregado') {
        this.servicoEmpregado
          .searchSubDoc('contatos')
          .then((resp) => {
            this.itemAux = resp;
            if (this.itemAux === undefined) {
              return;
            } else {
              const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));
              colecao.push(this.contatos);
              this.servicoEmpregado
                .patchUser(colecao, 'contatos')
                .then((respFinal) => {
                  if (!respFinal) {
                    return;
                  } else {
                    this.perfilEmpregado('');
                    this.exibeToast('Alteração concluída!', 'confirma');
                  }
                })
                .catch();
            }
          })
          .catch();
      } else if (localStorage.getItem('profile') === 'empresa') {
        this.servicoEmpresa
          .searchSubDoc('contatos')
          .then((resp) => {
            this.itemAux = resp;
            if (this.itemAux === undefined) {
              return;
            } else {
              const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));
              colecao.push(this.contatos);

              this.servicoEmpresa
                .patchEmpresa(colecao, 'contatos')
                .then((respFinal) => {
                  if (!respFinal) {
                    return;
                  } else {
                    this.perfilEmpresa('');
                    this.exibeToast('Alteração concluída!', 'confirma');
                  }
                })
                .catch();
            }
          })
          .catch();
      }
    }

    this.abreModal(false, 'contatos');
  }
  //! #endregion

  formataCpf() {
    if (this.perfil.cpf !== '' && this.perfil.cpf !== null) {
      this.perfil.cpf = formatarCPF(this.perfil.cpf);
    }
  }

  formataRG() {
    if (this.perfil.rg !== '' && this.perfil.rg !== null) {
      this.perfil.rg = formatarRG(this.perfil.rg);
    }
  }

  searchCEP(evento) {
    const cepDig = evento.detail.value;
    if (cepDig.length > 7) {
      if (cepDig.includes('-')) {
        cepDig.replace('-', '');
      }

      this.cep
        .localizaCEP(cepDig)
        .then((response) => {
          this.itemAux = response;
          if (this.itemAux === undefined) {
            return;
          } else {
            this.enderecos.bairro = this.itemAux.bairro;
            this.enderecos.endereco = this.itemAux.logradouro;
            this.enderecos.cidade = this.itemAux.localidade;
            this.enderecos.estado = this.itemAux.uf;
          }
        })
        .catch();
    }
  }

  abreModal(open: boolean, campo: string) {
    switch (campo) {
      case 'pessoal':
        this.modal.modalPessoalEmpregado = open;
        break;
      case 'pessoalEmpresa':
        this.modal.modalPessoalEmpresa = open;
        break;
      case 'endereco':
        this.modal.modalEndereco = open;
        break;
      case 'contatos':
        this.modal.modalContatos = open;
        break;
      case 'formEdu':
        this.modal.modalPessoalEmpregado = open;
        break;
      case 'expP':
        this.modal.modalPessoalEmpregado = open;
        break;
      case 'cursos':
        this.modal.modalPessoalEmpregado = open;
        break;
      case 'idiomas':
        this.modal.modalPessoalEmpregado = open;
        break;
    }

    if (localStorage.getItem('profile') === 'empresa') {
      this.perfilEmpresa(campo);
    } else if (localStorage.getItem('profile') === 'empregado') {
      this.perfilEmpregado(campo);
    }
  }

  async exibeToast(msg: string, tipo) {
    switch (tipo) {
      case 'confirma':
        const toastConfirma = await this.toast.create({
          message: msg,
          duration: 2000,
          position: 'top',
          animated: true,
          color: 'success',
        });

        toastConfirma.present();
        break;

      case 'aviso':
        const toastAviso = await this.toast.create({
          message: msg,
          duration: 2000,
          position: 'top',
          animated: true,
          color: 'danger',
        });

        toastAviso.present();
        break;

      case 'aviso':
        const toastErro = await this.toast.create({
          message: msg,
          duration: 2000,
          position: 'top',
          animated: true,
          color: 'warning',
        });

        toastErro.present();
        break;
    }
  }
}
