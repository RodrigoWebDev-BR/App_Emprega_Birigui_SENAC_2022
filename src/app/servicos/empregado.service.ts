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
}
