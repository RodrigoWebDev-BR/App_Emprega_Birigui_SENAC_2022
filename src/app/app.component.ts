import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/home', icon: 'person' },
    { title: 'Notificações', url: '/folder/notificacao', icon: 'notifications' },
    { title: 'Currículo', url: '/folder/exp-profissional', icon: 'document' },
    { title: 'Contato', url: '/folder/contato', icon: 'call' },
    { title: 'Sair', url: '/login', icon: 'power' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
