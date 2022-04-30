import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  candidato = {cpf : '' , senha : ''};

  confirmarLogin(){
    console.log(this.candidato);
  }

  constructor() { }

  ngOnInit() {
  }
}
