import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CepService {

  constructor(private http: HttpClient) { }

  localizaCEP(cod: string){

    const url = 'https://viacep.com.br/ws/' + cod +  '/json/';

    const header = {
      headers: new HttpHeaders().set('Content-Type', `application/json`)
    }
    console.log(url)
    return this.http.get(url, header).toPromise();
  }
}
