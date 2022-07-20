import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/notificacao', icon: 'notifications'},
    { title: 'Curriculo', url: '/curriculo', icon: 'folder'},
    { title: 'Vagas', url: '/inscricao-vaga', icon: 'briefcase'},
    { title: 'Sair', url: '/login', icon: 'power'}
  ];

  public labels = ['João do chocolate']; 
  constructor() {}
}
