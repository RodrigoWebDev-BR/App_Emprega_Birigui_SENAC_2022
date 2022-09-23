import { CepService } from './../servicos/cep.service';
import { validaEmail } from 'src/environments/functions';
import {
  formatarCPF,
  formatarRG,
  validaCPF,
} from './../../environments/functions';
import {
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
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

  public checado = false;
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
    validado: false,
  };

  public formacao = {
    instituicao: '',
    curso: '',
    nivel: '',
    situacao: '',
  };

  public experiencia = {
    empresa: '',
    cargo: '',
    dtInicio: '',
    dtFinal: '',
    atual: false,
    descricao: '',
  };

  public curso = {
    nome: '',
    instituicao: '',
  };

  public idioma = {
    idioma: '',
    nivel: '',
    bandeira: '',
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
    public cep: CepService,
    public nav: NavController
  ) {}

  ngOnInit() {
    if (localStorage.getItem('profile') === 'empresa') {
      this.perfilEmpresa('');
    } else if (localStorage.getItem('profile') === 'empregado') {
      this.perfilEmpregado('');
    }
  }

  loadContato(perfil: any) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < perfil.contatos.length; i++) {
      const element = perfil.contatos[i];
      if (element.validado) {
        this.contatoPrincipal = element.contato;
      }
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
                          .putUser(colecao, sessao)
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
                          .putEmpresa(colecao, 'contatos')
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

  // #region Update Insert dados
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

  async addContatos(princial: boolean) {
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
              this.contatos.validado = princial;
              colecao.push(this.contatos);
              this.servicoEmpregado
                .putUser(colecao, 'contatos')
                .then((respFinal) => {
                  if (!respFinal) {
                    return;
                  } else {
                    this.perfilEmpregado('');
                    this.exibeToast('Dados inseridos com sucesso!', 'confirma');
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
              this.contatos.validado = princial;
              colecao.push(this.contatos);
              this.servicoEmpresa
                .putEmpresa(colecao, 'contatos')
                .then((respFinal) => {
                  if (!respFinal) {
                    return;
                  } else {
                    this.perfilEmpresa('');
                    this.exibeToast('Dados inseridos com sucesso!', 'confirma');
                  }
                })
                .catch();
            }
          })
          .catch();
      }
    }

    this.abreModal(false, 'contatos');

    setTimeout(() => {
      this.contatos.tipo = '';
      this.contatos.contato = '';
    }, 1000);
  }

  async addFormacao() {
    if (
      this.formacao.instituicao === null ||
      this.formacao.instituicao === ''
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        subHeader: '',
        message: 'Necessário informar a instituição',
        buttons: ['OK'],
        cssClass: 'cssAlerta',
      });
      await alerta.present();

      return;
    } else if (this.formacao.nivel === null || this.formacao.nivel === '') {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        subHeader: '',
        message: 'Necessário informar sua formação',
        buttons: ['OK'],
        cssClass: 'cssAlerta',
      });
      await alerta.present();

      return;
    } else if (
      this.formacao.situacao === null ||
      this.formacao.situacao === ''
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        subHeader: '',
        message: 'Necessário informar a situação do curso',
        buttons: ['OK'],
        cssClass: 'cssAlerta',
      });
      await alerta.present();

      return;
    } else {
      this.servicoEmpregado
        .searchSubDoc('formacaoEdu')
        .then((resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            return;
          } else {
            const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));
            colecao.push(this.formacao);
            this.servicoEmpregado
              .putUser(colecao, 'formacaoEdu')
              .then((respFinal) => {
                if (!respFinal) {
                  return;
                } else {
                  this.perfilEmpregado('');
                  this.exibeToast('Dados inseridos com sucesso!', 'confirma');
                }
              })
              .catch();
          }
        })
        .catch();
    }

    this.abreModal(false, 'formEdu');

    setTimeout(() => {
      this.formacao.curso = '';
      this.formacao.instituicao = '';
      this.formacao.nivel = '';
      this.formacao.situacao = '';
    }, 1000);
  }

  async addExp() {
    if (this.experiencia.empresa === '' || this.experiencia.empresa === null) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher o nome da empresa.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (
      this.experiencia.cargo === '' ||
      this.experiencia.cargo === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher o cargo da empresa.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (
      this.experiencia.descricao === '' ||
      this.experiencia.descricao === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher a descrição.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (
      this.experiencia.dtInicio === '' ||
      this.experiencia.dtInicio === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'Atenção',
        message: 'Necessário preencher a data de admissão.',
        buttons: ['OK'],
      });
      await alerta.present();

      //return para cancelar a execução do método
      return;
    } else {
      if (
        this.experiencia.dtFinal === '' ||
        this.experiencia.dtFinal === null
      ) {
        this.experiencia.dtFinal = 'até Atualmente';
      } else {
        const [ano, mes, dia] = this.experiencia.dtFinal.split('-');

        this.experiencia.dtFinal = 'até ' + dia + '/' + mes + '/' + ano;
      }

      this.experiencia.atual = this.checado;
      this.checado = false;
      this.servicoEmpregado
        .searchSubDoc('expProfissional')
        .then((resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            return;
          } else {
            const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));
            colecao.push(this.experiencia);
            this.servicoEmpregado
              .putUser(colecao, 'expProfissional')
              .then((respFinal) => {
                if (!respFinal) {
                  return;
                } else {
                  this.perfilEmpregado('');
                  this.exibeToast('Dados inseridos com sucesso!', 'confirma');
                }
              })
              .catch();
          }
        })
        .catch();

      this.abreModal(false, 'expP');

      setTimeout(() => {
        this.experiencia.empresa = '';
        this.experiencia.cargo = '';
        this.experiencia.descricao = '';
        this.experiencia.dtInicio = '';
        this.experiencia.dtFinal = '';
      }, 1000);
    }
  }

  async addCurso() {
    if (this.curso.nome === '' || this.curso.nome === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Não é permitido adicionar um curso sem nome.',
        buttons: ['ok'],
        cssClass: 'cssAlerta',
      });

      await alerta.present();

      return;
    } else if (
      this.curso.instituicao === '' ||
      this.curso.instituicao === null
    ) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO!',
        message: 'Não é permitido um curso sem Instituição de Ensino.',
        buttons: ['ok'],
        cssClass: 'cssAlerta',
      });

      await alerta.present();

      return;
    } else {
      this.servicoEmpregado
        .searchSubDoc('cursos')
        .then((resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            return;
          } else {
            const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));
            colecao.push(this.curso);
            this.servicoEmpregado
              .putUser(colecao, 'cursos')
              .then((respFinal) => {
                if (!respFinal) {
                  return;
                } else {
                  this.perfilEmpregado('');
                  this.exibeToast('Dados inseridos com sucesso!', 'confirma');
                }
              })
              .catch();
          }
        })
        .catch();

      this.abreModal(false, 'cursos');

      setTimeout(() => {
        this.curso.nome = '';
        this.curso.instituicao = '';
      }, 1000);
    }
  }

  async addIdioma() {
    if (this.idioma.idioma === '' || this.idioma.idioma === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        subHeader: '',
        message: 'Não é permitido inserir um idioma sem a linguagem.',
        buttons: ['OK'],
      });
      await alerta.present();

      return;
    } else if (this.idioma.nivel === '' || this.idioma.nivel === null) {
      const alerta = await this.mensagem.create({
        header: 'ATENÇÃO',
        subHeader: '',
        message:
          'Não é permitido inserir um idioma sem o nível de conhecimento.',
        buttons: ['OK'],
      });

      await alerta.present();

      return;
    } else {
      this.idioma.bandeira = '/assets/bandeiras/';

      switch (this.idioma.idioma) {
        case 'Inglês':
          this.idioma.bandeira += 'ingles.jpg';
          break;

        case 'Espanhol':
          this.idioma.bandeira += 'espanhol.png';
          break;

        case 'Japonês':
          this.idioma.bandeira += 'japones.png';
          break;

        case 'Frânces':
          this.idioma.bandeira += 'frances.png';
          break;

        case 'Italiano':
          this.idioma.bandeira += 'italiano.png';
          break;

        default:
          this.idioma.bandeira += 'alemao.png';
          break;
      }

      this.servicoEmpregado
        .searchSubDoc('idiomas')
        .then(async (resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            return;
          } else {
            const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));

            const redundante: any[] = JSON.parse(
              JSON.stringify(
                this.itemAux.filter(
                  // eslint-disable-next-line no-underscore-dangle
                  (idioma) => idioma.idioma === this.idioma.idioma
                )
              )
            );

            if (redundante.length > 0) {
              const alerta = await this.mensagem.create({
                header: 'ATENÇÃO',
                subHeader: '',
                message: 'Não é permitido inserir um idioma repetido.',
                buttons: ['OK'],
              });

              await alerta.present();

              return;
            } else {
              colecao.push(this.idioma);
              this.servicoEmpregado
                .putUser(colecao, 'idiomas')
                .then((respFinal) => {
                  if (!respFinal) {
                    return;
                  } else {
                    this.perfilEmpregado('');
                    this.exibeToast('Dados inseridos com sucesso!', 'confirma');
                  }
                })
                .catch();
            }
          }
        })
        .catch();

      this.abreModal(false, 'idiomas');

      setTimeout(() => {
        this.idioma.idioma = '';
        this.idioma.nivel = '';
      }, 1000);
    }
  }
  // #endregion

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
        this.modal.modalFormacao = open;
        break;
      case 'expP':
        this.modal.modalExp = open;
        break;
      case 'cursos':
        this.modal.modalCursos = open;
        break;
      case 'idiomas':
        this.modal.modalIdiomas = open;
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

      case 'erro':
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

  verificaContatos() {
    if (localStorage.getItem('profile') === 'empregado') {
      this.servicoEmpregado
        .searchSubDoc('contatos')
        .then((resp) => {
          this.itemAux = resp;
          if (this.itemAux === undefined) {
            return;
          } else {
            const colecao: any[] = JSON.parse(JSON.stringify(this.itemAux));
            const conclusao = colecao.filter(
              (contatos) => contatos.validado === true
            );
            if (
              this.contatos.tipo === 'Celular' ||
              this.contatos.tipo === 'Telefone'
            ) {
              if (colecao !== undefined && colecao.length > 0) {
                if (conclusao.length === 0) {
                  this.mensagemPrincipal();
                } else {
                  this.addContatos(false);
                }
              } else {
                this.mensagemPrincipal();
              }
            } else {
              this.addContatos(false);
            }
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
            const conclusao = colecao.filter(
              (contatos) => contatos.validado === true
            );
            if (
              this.contatos.tipo === 'Celular' ||
              this.contatos.tipo === 'Telefone'
            ) {
              if (colecao !== undefined && colecao.length > 0) {
                if (conclusao.length === 0) {
                  this.mensagemPrincipal();
                } else {
                  this.addContatos(false);
                }
              } else {
                this.mensagemPrincipal();
              }
            } else {
              this.addContatos(false);
            }
          }
        })
        .catch();
    }
  }

  async mensagemPrincipal() {
    const definir = await this.mensagem.create({
      header: 'ATENÇÃO',
      message: 'Deseja definir este contato como principal?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            this.addContatos(false);
          },
        },
        {
          text: 'Sim',
          handler: () => {
            this.addContatos(true);
          },
        },
      ],
    });
    await definir.present();
  }

  atualChk($event) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    $event.currentTarget.checked
      ? (this.checado = true)
      : (this.checado = false);

    if (this.checado) {
      this.experiencia.dtFinal = '';
    }
  }

  home() {
    this.nav.navigateRoot('home');
  }

  config() {
    this.nav.navigateRoot('config');
  }
  notifi() {
    this.nav.navigateRoot('notificacao');
  }

  vagas() {
    this.nav.navigateRoot('inscricao-vaga');
  }

  logout() {
    localStorage.clear();
    this.nav.navigateRoot('login/login');
  }
}
