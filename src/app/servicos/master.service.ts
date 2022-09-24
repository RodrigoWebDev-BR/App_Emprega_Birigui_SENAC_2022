import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  perfis() {
    const url = 'http://localhost:3000/masters';

    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get(url, { headers }).toPromise();
  }
}
