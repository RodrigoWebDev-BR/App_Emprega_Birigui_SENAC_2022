import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  perfil() {
    let url = 'http://localhost:3000/empresas';

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    url += '/' + localStorage.getItem('idUser');
    return this.http.get(url, { headers }).toPromise();
  }

  perfis() {
    const url = 'http://localhost:3000/empresas';

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  searchSubDoc(sessao: string) {
    const url =
      'http://localhost:3000/empresas/' +
      localStorage.getItem('idUser') +
      '/' +
      sessao;

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }

  patchEmpresa(documento: any, sessao: string, id: string) {
    let subDoc: any = {};

    switch (sessao) {
      case 'contatos':
        subDoc = { contatos: documento };
        break;

      default:
        subDoc = documento;
        break;
    }
    
    let url =
    'http://localhost:3000/empresas/';
    if(id !== null && id !== undefined){
      url += id;
    }else{
      url += localStorage.getItem('idUser');
    }
    console.log(id, url);
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.patch(url, subDoc, { headers }).toPromise();
  }

  putEmpresa(documento: any, sessao: string) {
    const url =
      'http://localhost:3000/empresas/' +
      localStorage.getItem('idUser') +
      '/' +
      sessao;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.put(url, documento, { headers }).toPromise();
  }
}
