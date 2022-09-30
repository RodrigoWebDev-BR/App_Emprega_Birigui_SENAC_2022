import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpregadoService {
  constructor(private http: HttpClient) {}

  perfil() {
    const url = 'http://localhost:3000/users/' + localStorage.getItem('idUser');
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  perfilId(id: string) {
    const url = 'http://localhost:3000/users/' + id;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  perfis() {
    const url = 'http://localhost:3000/users';

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  searchSubDoc(sessao: string) {
    const url =
      'http://localhost:3000/users/' +
      localStorage.getItem('idUser') +
      '/' +
      sessao;

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  searchSubDocId(sessao: string, id: string) {
    const url =
      'http://localhost:3000/users/' +
      id +
      '/' +
      sessao;

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  patchUser(documento: any, sessao: string) {
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

    const url = 'http://localhost:3000/users/' + localStorage.getItem('idUser');
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.patch(url, subDoc, { headers }).toPromise();
  }

  patchUserId(documento: any, sessao: string, id: string) {
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

    const url = 'http://localhost:3000/users/' + id;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.patch(url, subDoc, { headers }).toPromise();
  }

  putUser(documento: any, sessao: string) {
    const url = 'http://localhost:3000/users/' + localStorage.getItem('idUser') + '/' + sessao;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.put(url, documento, { headers }).toPromise();
  }

  putUserId(documento: any, sessao: string, id: string) {
    const url = 'http://localhost:3000/users/' + id + '/' + sessao;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.put(url, documento, { headers }).toPromise();
  }
}
