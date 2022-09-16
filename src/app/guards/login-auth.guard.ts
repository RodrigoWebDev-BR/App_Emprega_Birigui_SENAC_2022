import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {

  constructor(private nav: NavController) {}

  canActivate(): boolean {
    const login = localStorage.getItem('accessToken') !== null ? localStorage.getItem('accessToken') : ''

     if(login.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')){
       return true
     }else{
       this.nav.navigateRoot('login/login')
     }
    return;
    
  }
}
