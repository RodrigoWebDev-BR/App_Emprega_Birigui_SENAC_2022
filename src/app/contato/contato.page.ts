import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {;

  contato = {id: '', contato:''}

  constructor(public rota : Router) {

  }

  addContato(){
      console.log(this.contato)
      this.rota.navigate(['folder']);
  }

  ngOnInit() {
  }

}
