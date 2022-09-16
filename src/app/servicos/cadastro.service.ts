import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  cadastrar(documento: any, typeUser: string) {
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    const url = 'http://localhost:3000/';

    switch (typeUser) {
      case 'empregado':
        return this.http
          .post(url + 'users', documento, { headers })
          .toPromise();
        break;

      case 'empresa':
        return this.http
          .post(url + 'empresas', documento, { headers })
          .toPromise();
        break;
    }
  }
}
