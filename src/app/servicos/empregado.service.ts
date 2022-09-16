import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpregadoService {
  constructor(private http: HttpClient) {}

  perfil() {
    let url = 'http://localhost:3000/users';
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    url += '/' + localStorage.getItem('idUser');
    return this.http.get(url, { headers }).toPromise();
  }

  searchSubDoc(sessao: string) {
    let url =
      'http://localhost:3000/users/' +
      localStorage.getItem('idUser') +
      '/' +
      sessao;

    const headers = new HttpHeaders().set('Content-Type', `application/json`);

    return this.http.get(url, { headers }).toPromise();
  }

  pathUser(documento: any, sessao: string) {
    let subDoc: any = {};
    switch (sessao) {
      case 'contatos':
        subDoc = { contatos: documento };
        break;

      case 'formacaoEdu':
        subDoc = { formacaoEdu: documento };
        break;

      case 'expProfissional':
        subDoc = { expProfissional: documento };
        break;

      case 'cursos':
        subDoc = { cursos: documento };
        break;
      case 'idiomas':
        subDoc = { idiomas: documento };
        break;

      default:
        subDoc = documento;
        break;
    }

    let url = 'http://localhost:3000/users/' + localStorage.getItem('idUser');

    const headers = new HttpHeaders().set('Content-Type', `application/json`);

    return this.http.patch(url,subDoc, { headers }).toPromise();
  }
}
