import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-vaga',
  templateUrl: './timeline-vaga.page.html',
  styleUrls: ['./timeline-vaga.page.scss'],
})
export class TimelineVagaPage implements OnInit {

  contato = { contato: '', id:''}; 

  constructor( private rota : Router ) { }

  nomeContato(){

    console.log(this.contato)

  }

  mostrarVaga(){
    this.rota.navigate['home'];
  }

  ngOnInit() {
  }

}
