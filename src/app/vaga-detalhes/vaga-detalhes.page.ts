import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaga-detalhes',
  templateUrl: './vaga-detalhes.page.html',
  styleUrls: ['./vaga-detalhes.page.scss'],
})
export class VagaDetalhesPage implements OnInit {

  inscrever(){
    this.rota.navigate(['folder']);
  }

  constructor(public rota : Router) { 


  }

  ngOnInit() {
  }

}
