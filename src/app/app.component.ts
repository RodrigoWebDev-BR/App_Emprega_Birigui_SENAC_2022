import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  menus:string
  nomeMenu:string

  public appPages = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/notificacao', icon: 'notifications'},
    { title: 'Curriculo', url: '/curriculo', icon: 'folder'},
    { title: 'Vagas', url: '/inscricao-vaga', icon: 'briefcase'}
  ];
  
  public appPages2 = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/notificacao', icon: 'notifications'},
    { title: 'Nova vaga', url: '/lancamento-vaga', icon: 'add-circle'},
    { title: 'Dados', url: '/curriculo', icon: 'server'}
  ];

  public appPages3 = [
    { title: 'Usuários', url: '/lista-usuarios', icon: 'body' },
    { title: 'Empresas', url: '/lista-empresas', icon: 'storefront'}
  ];
  
  constructor(public nav: NavController) {}

  ngOnInit(){

    if(localStorage.getItem('nomeMenu') !== null){
      this.nomeMenu = localStorage.getItem('nomeMenu').split(' ')[0];
    }
    
    this.menus = localStorage.getItem('profile')
  }

  logout(){
    localStorage.clear()
    this.nav.navigateRoot('login/login');
    
  }
}
