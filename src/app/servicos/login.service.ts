import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(documento: string, senha: string, userType: string) {
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    const url = 'http://localhost:3000/';

    switch (userType) {
      case 'empregado':
        const empregado = { cpf: documento, password: senha };
        return this.http
          .post(url + 'users/authenticate', empregado, { headers })
          .toPromise();
        break;

      case 'empresa':
        const empresa = { cnpj: documento, password: senha };
        return this.http
          .post(url + 'empresas/authenticate', empresa, { headers })
          .toPromise();
        break;

      default:
        const master = { email: documento, password: senha };
        return this.http
          .post(url + 'masters/authenticate', master, { headers })
          .toPromise();
        break;
    }
  }

  verificaDoc(documento: string, userType: string) {
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    const url = 'http://localhost:3000/';

    switch (userType) {
      case 'empregado':
        const empregado = { cpf: documento};
        return this.http
          .post(url + 'users/authenticateCPF', empregado, { headers })
          .toPromise();
        break;

      case 'empresa':
        const empresa = { cnpj: documento };
        return this.http
          .post(url + 'empresas/authenticateCNPJ', empresa, { headers })
          .toPromise();
        break;
    }
  }

}
