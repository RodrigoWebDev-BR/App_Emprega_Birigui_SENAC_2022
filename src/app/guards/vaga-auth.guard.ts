import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VagaAuthGuard implements CanActivate {
  constructor(private nav: NavController){

  }

  canActivate(): boolean{
    // eslint-disable-next-line max-len
    const login = localStorage.getItem('idVaga') !== null && localStorage.getItem('idVaga') !== undefined ? localStorage.getItem('idVaga') : '';
    if(login !== ''){
      return true;
    }else{
      this.nav.navigateRoot('home');
      return;
    }
  }

}
