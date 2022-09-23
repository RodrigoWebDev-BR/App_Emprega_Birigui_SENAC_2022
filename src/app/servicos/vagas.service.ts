import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VagasService {

  constructor(private http: HttpClient) { }

  searchVaga() {
    const url = 'http://localhost:3000/vagas/' + localStorage.getItem('idVaga');
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  searchVagaFor(id: string) {
    const url = 'http://localhost:3000/vagas/' + id;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  searchVagas() {
    const url = 'http://localhost:3000/vagas';
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  searchSubDoc() {
    const url =
      'http://localhost:3000/vagas/' +
      localStorage.getItem('idVaga') +
      '/candidaturas';

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  lancaVaga(documento: any) {
    const url = 'http://localhost:3000/vagas';
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.post(url, documento, { headers }).toPromise();
  }

  patchVaga(documento: any, sessao: string, id: string) {
    let subDoc: any = {};

    switch (sessao) {
      case 'temp':
        subDoc = { congelada: documento };
        break;

      case 'closed':
        subDoc = { online: documento };
        break;

      default:
        subDoc = documento;
        break;
    }

    const url = 'http://localhost:3000/vagas' + '/' + id;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.patch(url, subDoc, { headers }).toPromise();
  }

  putVaga(documento: any) {
    const url = 'http://localhost:3000/vagas/' + localStorage.getItem('idVaga') + '/candidaturas';
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.put(url, documento, { headers }).toPromise();
  }
}
