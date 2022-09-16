import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.page.html',
  styleUrls: ['./vagas.page.scss'],
})
export class VagasPage implements OnInit {

  empregosDisponivel = [
    {
      titulo : 'Programador WEB',
      tipo : 'CLT',
      contrato : 'PPrazo Indeterminado',
      online : true,
      dataPub : '01/01/2022',
    },
    {
      titulo : 'Programador Angular ',
      tipo : 'pj',
      contrato : 'PPrazo Indeterminado',
      online : false,
      dataPub : '01/01/2022',
    },
    {
      titulo : 'DevOps',
      tipo : 'CLT',
      contrato : 'PPrazo Indeterminado',
      online : true,
      dataPub : '01/01/2022',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
