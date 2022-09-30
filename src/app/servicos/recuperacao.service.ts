/* eslint-disable id-blacklist */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecuperacaoService {
  key =
    'CSLFF82G11G36QIUQYRUG10DXEM0NFU1833ZWHOPUVU01EUVPLZLZ4Z968G2OWI95K2386KKTMUHGV9M0MMMKUBEBK1KE7ZZFX3ALFGJ8T3F09W7U3P9QUOG44ONDJK8';

  constructor(private http: HttpClient) {}

  verificaDoc(documento: string, userType: string) {
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    const url = 'http://localhost:3000/';

    switch (userType) {
      case 'empregado':
        const empregado = { email: documento, who: userType };
        return this.http
          .post(url + 'users/authenticateEmail', empregado, { headers })
          .toPromise();
        break;

      case 'empresa':
        const empresa = { email: documento, who: userType };
        return this.http
          .post(url + 'empresas/authenticateEmail', empresa, { headers })
          .toPromise();
        break;
    }
  }

  enviarSms(num: string, mensagem: string) {
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    const url = 'https://api.smsdev.com.br/v1/send';
    num = num.replace('-', '').replace('(', '').replace(')', '').replace(' ', '');
    const doc = {
      key: this.key,
      type: 9,
      number: parseInt(num, 10),
      msg: mensagem,
    };
    return this.http
      .post(url , doc, { headers })
      .toPromise();
  }
}
