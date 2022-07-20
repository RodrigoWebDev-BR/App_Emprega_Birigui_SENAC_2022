import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaga-detalhes',
  templateUrl: './vaga-detalhes.page.html',
  styleUrls: ['./vaga-detalhes.page.scss'],
})
export class VagaDetalhesPage implements OnInit {
  router: any;

  inscrever(){
    this.rota.navigate(['timeline-vaga']);
  }

  voltar(){
    this.rota.navigate(['home']);
  }

  constructor(public rota : Router) { 


  }

  ngOnInit() {
  }

}
