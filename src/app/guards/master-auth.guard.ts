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
export class MasterAuthGuard implements CanActivate {
  constructor(private nav: NavController) {}

  canActivate(): boolean {
    // eslint-disable-next-line max-len
    const master = localStorage.getItem('profile');
    if (master === 'user_master') {
      return true;
    } else {
      this.nav.navigateRoot('home');
      return;
    }
  }
}
