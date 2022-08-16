import { MenuController, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // this.activatedRoute.snapshot.paramMap.get('id');

  empresa = true;
  empregado = false;

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
    public mensagem: AlertController
  ) {
    this.menuLeft.enable(true);
  }

  async fecharVaga(emprego) {
    const finalizar = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message: 'Deseja finalizar as vagas de ' + emprego.titulo + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Finalizar',
          handler: () => {
            emprego.online = false;
            this.empregosDisponivel[this.empregosDisponivel.indexOf(emprego)] =
              emprego;
          },
        },
      ],
    });

    await finalizar.present();
  }

  ngOnInit() {}
}
