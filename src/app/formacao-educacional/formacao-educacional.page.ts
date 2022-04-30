import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formacao-educacional',
  templateUrl: './formacao-educacional.page.html',
  styleUrls: ['./formacao-educacional.page.scss'],
})
export class FormacaoEducacionalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  adicionarFormacao(){
    console.log(this.adicionarFormacao);
  }

}
