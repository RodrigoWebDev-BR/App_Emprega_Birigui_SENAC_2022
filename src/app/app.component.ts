import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nomeMenu: string;
  menus: string;
  public appPages = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/notificacao', icon: 'notifications' },
    { title: 'Curriculo', url: '/curriculo', icon: 'folder' },
    { title: 'Vagas', url: '/inscricao-vaga', icon: 'briefcase' },
  ];

  public appPages2 = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Nova vaga', url: '/lancamento-vaga', icon: 'add-circle' },
    { title: 'Dados', url: '/curriculo', icon: 'server' },
  ];

  public appPages3 = [
    { title: 'Usuários', url: '/lista-usuarios', icon: 'body' },
    { title: 'Empresas', url: '/lista-empresas', icon: 'storefront' },
  ];

  constructor(public nav: NavController) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(){
    if(localStorage.getItem('nomeMenu') !== null){
      this.nomeMenu = localStorage.getItem('nomeMenu').split(' ')[0];
    }

    this.menus = localStorage.getItem('profile');
  }

  logout() {
    localStorage.clear();
    this.nav.navigateRoot('login/login');
  }
}
