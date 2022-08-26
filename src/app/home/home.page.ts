import { validarCNPJ } from './../../environments/functions';
import { MenuController, NavController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  empresa = false;

  empregado = false;

  none = false;

  empregosDisponivel = [
    {
      titulo: 'Programador web',
      tipo: 'CLT',
      contrato: 'Prazo indeterminado',
      online: true,
      dataPub: '22/02/2022',
    },
    {
      titulo: 'Programador C#',
      tipo: 'CLT',
      contrato: 'Prazo indeterminado',
      online: true,
      dataPub: '22/02/2022',
    },
    {
      titulo: 'Programador Fullstack',
      tipo: 'PJ',
      contrato: 'Temporário',
      online: false,
      dataPub: '22/02/2022',
    },
  ];

  public vagaDisponivel = [
    {
      titulo: 'Programador web',
      status: 'Currículo cadastrado',
      salario: '4000',
      dataPub: '14/06',
      id: '1',
    },
    {
      titulo: 'Programador C#',
      status: 'Currículo cadastrado',
      salario: '2000',
      dataPub: '14/06',
      id: '2',
    },
    {
      titulo: 'Programador Fullstack',
      status: 'Currículo cadastrado',
      salario: '6000',
      dataPub: '14/06',
      id: '3',
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

  abrirVaga() {
    this.nav.navigateForward('timeline-vaga');
  }

  async finalizar(emprego) {
    const finalizar = await this.mensagem.create({
      header: 'Atenção',
      message: 'Para finalizar a vaga ' + emprego.titulo + ' insira seu CNPJ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Finalizar',
          handler: (cnpj) => {
            if(validarCNPJ(cnpj[0])){
            emprego.online = false;
            this.empregosDisponivel[this.empregosDisponivel.indexOf(emprego)] = emprego;
            }else{
              this.exibeToast('CNPJ inválido')
            }
          },
        },
      ],
      inputs:[
        {
          placeholder:'CNPJ',
          attributes:{
            maxlength:18
          }
        }
      ]  
    });

    await finalizar.present();
  }

  async exibeToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: 'warning'
    });

    toast.present();
  }

  ngOnInit() {
    if(localStorage.getItem('reload') === null || localStorage.getItem('reload') === undefined){
      if(localStorage.getItem('menu') !== null || localStorage.getItem('menu') !== undefined){
        if(!this.none){
          localStorage.setItem('reload', 'true');
          window.location.reload();
        }
      }
    }else{
      this.none = true;
      localStorage.removeItem('reload')

      if(localStorage.getItem('menu') === 'empresa'){
        this.empresa = true
      }else if(localStorage.getItem('menu') === 'empregado'){
        this.empregado = true
      }
    }
  }
}
