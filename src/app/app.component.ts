import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menus: string;
  public appPages = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/notificacao', icon: 'notifications' },
    { title: 'Curriculo', url: '/curriculo', icon: 'folder' },
    { title: 'Vagas', url: '/inscricao-vaga', icon: 'briefcase' }
  ];

  public appPages2 = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/notificacao', icon: 'notifications' },
    { title: 'Nova vaga', url: '/lancamento-vaga', icon: 'add-circle' },
    { title: 'Dados', url: '/curriculo', icon: 'server' }
  ];

  public appPages3 = [
    { title: 'Usuários', url: '/lista-usuarios', icon: 'body' },
    { title: 'Empresas', url: '/lista-empresas', icon: 'storefront' }
  ];

  constructor(public nav: NavController) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(){
    this.menus = localStorage.getItem('menu');
  }


  logout() {
    localStorage.clear();
    this.nav.navigateRoot('login/login');
  }
}
