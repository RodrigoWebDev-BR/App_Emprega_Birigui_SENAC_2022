import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-vaga',
  templateUrl: './timeline-vaga.page.html',
  styleUrls: ['./timeline-vaga.page.scss'],
})
export class TimelineVagaPage implements OnInit {

  contato = { contato: '', id:''}; 

  constructor() { }

  nomeContato(){

    console.log(this.contato)

  }

  ngOnInit() {
  }

}
