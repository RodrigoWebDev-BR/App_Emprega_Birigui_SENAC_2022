import { validarCNPJ } from './../../environments/functions';
import {
  MenuController,
  NavController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // this.activatedRoute.snapshot.paramMap.get('id');

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
    public toast: ToastController
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
  }

  async exibeToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: 'warning',
    });

    toast.present();
  }

  ngOnInit() {
    if (localStorage.getItem('reload') === null || localStorage.getItem('reload') === undefined) {
      if (localStorage.getItem('menu') !== null || localStorage.getItem('menu') !== undefined) {
        if (!this.none) {
          localStorage.setItem('reload', 'true');
          window.location.reload();
        }
      }
    }else{
      this.none = true;
      localStorage.removeItem('reload');

      if(localStorage.getItem('menu') === 'empresa'){
        this.empresa = true;
      }else if(localStorage.getItem('menu') === 'empregado'){
        this.empregado = true;
      }
    }
  }
}
