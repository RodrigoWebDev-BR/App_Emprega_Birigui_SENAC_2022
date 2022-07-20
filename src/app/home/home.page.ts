import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
  }

  constructor(public route: Router, public menuLeft: MenuController) 
  { 
    this.menuLeft.enable(true);
  }

  ngOnInit() {
  }

}
