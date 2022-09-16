<<<<<<< Updated upstream
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
=======
import { validarCNPJ } from './../../environments/functions';
import {
  MenuController,
  NavController,
  AlertController,
  ToastController, 
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { EmpregadoService } from '../servicos/empregado.service';
import { EmpresaService } from '../servicos/empresa.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

<<<<<<< Updated upstream
  vagaDestaque = [
    {titulo: 'Programador web', cidade: 'Birigui', estado: 'SP'},
    {titulo: 'DBA', cidade: 'Araçatuba', estado: 'SP'},
    {titulo: 'Programador java', cidade: 'Lins', estado: 'SP'},
    {titulo: 'Programador c#', cidade: 'Guararapes', estado: 'SP'},
    {titulo: 'Programador mobile', cidade: 'Birigui', estado: 'SP'}
  ]

  vagaDisponivel =[
    {titulo: 'Programador web', quantidade: '3 vagas', salario: 'a combinar' , data_publicacao: '14/06'},
    {titulo: 'Programador Php', quantidade: '3 vagas', salario: 'a combinar', data_publicacao: '24/12'  },
    {titulo: 'Programador Javascript', quantidade: '1 vaga', salario: 'a combinar', data_publicacao: '12/03' },
    {titulo: 'Programador .net', quantidade: '3 vagas' , salario: 'a combinar', data_publicacao: '03/02' },
    {titulo: 'Programador .net core', quantidade: '2 vagas', salario: 'a combinar', data_publicacao: '06/02' }
  ]

  abrirVaga(){
    this.route.navigate(['vaga-detalhes']);
=======
  perfil : any = {};
  empresa = false;
  empregado = false;
  none = false;
  empregosDisponivel = [
    {
      titulo: 'Programador web',
      tipo: 'CLT',
      contrato: 'Prazo indeterminado',
      online: true,
      dataPub: '01/01/2022',
    },
    {
      titulo: 'Docente em Administração',
      tipo: 'CLT',
      contrato: 'Prazo indeterminado',
      online: true,
      dataPub: '01/01/2022',
    },
    {
      titulo: 'Auxiliar de limpeza',
      tipo: 'CLT',
      contrato: 'Prazo indeterminado',
      online: false,
      dataPub: '01/01/2022',
    },
    {
      titulo: 'Auxiliar de RH',
      tipo: 'PJ',
      contrato: 'Temporário',
      online: false,
      dataPub: '01/01/2022',
    },
  ];

  vagaDisponivel = [
    {
      titulo: 'Programador web',
      status: 'Currículo cadastrado',
      salario: '4000',
      dataPub: '14/06/2022',
    },
    {
      titulo: 'Programador C#',
      status: 'Currículo cadastrado',
      salario: '2000',
      dataPub: '15/01/2022',
    },
    {
      titulo: 'Programador FULLSTACK',
      status: 'Currículo cadastrado',
      salario: '6000',
      dataPub: '12/03/2022',
    },
  ];

  constructor(
    public nav: NavController,
    public menuLeft: MenuController,
    public mensagem: AlertController,
    public toast: ToastController,
    public servicoEmpregado: EmpregadoService,
    public servicoEmpresa: EmpresaService
  ) {
    this.menuLeft.enable(true);
  }

  async fecharVaga(emprego) {
    const finalizar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message:
        'Para finalizar as vagas de ' + emprego.titulo + ' insira seu CNPJ',
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
              emprego.online = false;
              this.empregosDisponivel[
                this.empregosDisponivel.indexOf(emprego)
              ] = emprego;
            } else {
              this.exibeToast('CNPJ inválido.');
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

    await finalizar.present();
>>>>>>> Stashed changes
  }

  constructor(public route: Router, public menuLeft: MenuController) 
  { 
    this.menuLeft.enable(true);
  }

  ngOnInit() {
<<<<<<< Updated upstream
  }

=======
    if (localStorage.getItem('reload') === null || localStorage.getItem('reload') === undefined) {
      if (localStorage.getItem('profile') !== null || localStorage.getItem('profile') !== undefined) {
        if (!this.none) {
          localStorage.setItem('reload', 'true');
          window.location.reload();
        }
      }
    }else{
      this.none = true;
      localStorage.removeItem('reload');

      if(localStorage.getItem('profile') === 'empresa'){
        this.perfilEmpresa();
      }else if(localStorage.getItem('profile') === 'empregado'){
        this.perfilEmpregado();
      }
    }
  }

  perfilEmpregado(){
    this.empregado = true;

    this.servicoEmpregado.perfil().then((response) => {
      this.perfil = response;
      if(this.perfil === undefined){
        this.exibeToast('Perfil com erro!')
      }
    }).catch();
  }

  perfilEmpresa(){
    this.empresa = true;

    this.servicoEmpresa.perfil().then((response) => {
      this.perfil = response;
      if(this.perfil === undefined){
        this.exibeToast('Perfil com erro!')
      }
    }).catch();
  }

>>>>>>> Stashed changes
}
