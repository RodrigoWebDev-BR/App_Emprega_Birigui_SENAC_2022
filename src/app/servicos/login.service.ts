import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
constructor(private http: HttpClient) {}


  login(cpf: string, password: string) {
    const candidato = { cpf: cpf, password: password};

    const url = 'http://localhost:3000/users/authenticate';
    const headers = new HttpHeaders().set('Content-Type', `application/json`);

    // this.http.post(url, candidato, {headers})
    // .subscribe(review=>{
    //   return review
    // });

    return this.http.post(url, candidato, {headers}).toPromise();
  }
}
