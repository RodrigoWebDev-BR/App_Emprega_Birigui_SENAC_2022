import { AlertController } from '@ionic/angular';
import { EmpresaService } from './../servicos/empresa.service';
import { EmpregadoService } from './../servicos/empregado.service';
import { EmpresaPage } from './../empresa/empresa.page';
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

  public estadoCivil = [
    { id: '1', estadoAtual: 'Solteiro(a)' },
    { id: '2', estadoAtual: 'Casado(a)' },
    { id: '3', estadoAtual: 'União Estável' },
    { id: '4', estadoAtual: 'Divorciado(a)' },
    { id: '5', estadoAtual: 'Viúvo(a)' },
  ];

  tipoContato = [
    { id: '2', nome: 'Celular' },
    { id: '3', nome: 'Telefone' },
    { id: '4', nome: 'LinkedIn' },
    { id: '4', nome: 'Instagram' },
    { id: '4', nome: 'Facebook' },
  ];

  formacoes = [
    { id: '1', nivel: '2º Grau Médio' },
    { id: '2', nivel: 'Técnologo' },
    { id: '3', nivel: 'Ensino Superior' },
    { id: '4', nivel: 'Pós Graduação' },
    { id: '5', nivel: 'Mestrado' },
    { id: '6', nivel: 'Doutorado' },
    { id: '7', nivel: 'Outros' },
  ];

  conclusoes = [
    { id: 'I', resp: 'Incompleto' },
    { id: 'A', resp: 'Em andameno' },
    { id: 'C', resp: 'Concluído' },
  ];

  tipoIdioma = [
    { id: '1', nome: 'Ingles' },
    { id: '2', nome: 'Espanhol' },
    { id: '3', nome: 'Japones' },
    { id: '4', nome: 'Frances' },
    { id: '5', nome: 'Italiano' },
    { id: '6', nome: 'Alemao' },
  ];

  constructor(
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService,
    public mensagem: AlertController
  ) {}

  ngOnInit() {
    if (localStorage.getItem('profile') === 'empresa') {
      this.perfilEmpresa();
    } else if (localStorage.getItem('profile') === 'empregado') {
      this.perfilEmpregado();
    }
  }

  perfilEmpregado() {
    this.empregado = true;

    this.servicoEmpregado
      .perfil()
      .then((response) => {
        this.perfil = response;

        this.loadContato(this.perfil);
        if (this.perfil === undefined) {
        }
      })
      .catch();
  }

  perfilEmpresa() {
    this.empresa = true;
    this.servicoEmpresa
      .perfil()
      .then((response) => {
        this.perfil = response;

        this.loadContato(this.perfil);
        if (this.perfil === undefined) {
        }
      })
      .catch();
  }

  loadContato(perfil: any) {
    for (let i = 0; i < this.perfil.contatos.lenght; i++) {
      const element = this.perfil.contatos[i];
      if (element.tipo === 'Celular') {
        this.contatoPrincipal = element.cotato;
      }
    }
  }

  async removerDados(item, sessao: string, usuario: string) {
    switch (sessao) {
      case 'contatos':
        const removeContato = await this.mensagem.create({
          header: 'ATENÇÃO',
          message:
            'Confirma a exclusão do contato ' +
            item.tipo +
            ' - ' +
            item.contato +
            ' ?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Sim',
              handler: () => {
                if(usuario === 'empregado'){
                  this.servicoEmpregado.searchSubDoc(sessao)
                  .then((resp) =>{
                    this.itemAux = resp;
                    if(this.itemAux === undefined){
                      return;
                    }else{
                     const colecao: any [] = JSON.parse(JSON.stringify(this.itemAux.filter((contatos) => contatos._id !== item._id)));

                      this.servicoEmpregado.pathUser(colecao, sessao)
                      .then((respFinal)=>{
                        if(!respFinal){
                          return;
                        }else{
                          this.perfilEmpregado();
                        }
                      })
                      .catch();
                    }
                  })
                  .catch();                  
                }else{
                  this.servicoEmpresa.searchSubDoc(sessao)
                  .then((resp) =>{
                    this.itemAux = resp;
                    if(this.itemAux === undefined){
                      return;
                    }else{
                     const colecao: any [] = JSON.parse(JSON.stringify(this.itemAux.filter((contatos) => contatos._id !== item._id)));

                      this.servicoEmpresa.pathEmpresa(colecao)
                      .then((respFinal)=>{
                        if(!respFinal){
                          return;
                        }else{
                          this.perfilEmpresa();
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
      message: 'Confirma a exclusão da formação ' + item.instituicao  + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Sim',
          handler: () => {
            this.servicoEmpregado.searchSubDoc(sessao)
                  .then((resp) =>{
                    this.itemAux = resp;
                    if(this.itemAux === undefined){
                      return;
                    }else{
                     const colecao: any [] = JSON.parse(JSON.stringify(this.itemAux.filter((formacoes) => formacoes._id !== item._id)));

                      this.servicoEmpregado.pathUser(colecao, sessao)
                      .then((respFinal)=>{
                        if(!respFinal){
                          return;
                        }else{
                          this.perfilEmpregado();
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
      message: 'Confirma a exclusão da experiência ' + item.empresa + ' - ' + item.cargo  + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Sim',
          handler: () => {  
            this.servicoEmpregado.searchSubDoc(sessao)
                  .then((resp) =>{
                    this.itemAux = resp;
                    if(this.itemAux === undefined){
                      return;
                    }else{
                     const colecao: any [] = JSON.parse(JSON.stringify(this.itemAux.filter((exp) => exp._id !== item._id)));

                      this.servicoEmpregado.pathUser(colecao, sessao)
                      .then((respFinal)=>{
                        if(!respFinal){
                          return;
                        }else{
                          this.perfilEmpregado();
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
      message: 'Confirma a exclusão do curso ' + item.nome  +  ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {          }

        },
        {
          text: 'Sim',
          handler: () => { 
            this.servicoEmpregado.searchSubDoc(sessao)
                  .then((resp) =>{
                    this.itemAux = resp;
                    if(this.itemAux === undefined){
                      return;
                    }else{
                     const colecao: any [] = JSON.parse(JSON.stringify(this.itemAux.filter((curso) => curso._id !== item._id)));

                      this.servicoEmpregado.pathUser(colecao, sessao)
                      .then((respFinal)=>{
                        if(!respFinal){
                          return;
                        }else{
                          this.perfilEmpregado();
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
      message: 'Confirma a exclusão do contato ' + item.idioma + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {          }

        },
        {
          text: 'Sim',
          handler: () => {   
            this.servicoEmpregado.searchSubDoc(sessao)
                  .then((resp) =>{
                    this.itemAux = resp;
                    if(this.itemAux === undefined){
                      return;
                    }else{
                     const colecao: any [] = JSON.parse(JSON.stringify(this.itemAux.filter((idioma) => idioma._id !== item._id)));

                      this.servicoEmpregado.pathUser(colecao, sessao)
                      .then((respFinal)=>{
                        if(!respFinal){
                          return;
                        }else{
                          this.perfilEmpregado();
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
}
