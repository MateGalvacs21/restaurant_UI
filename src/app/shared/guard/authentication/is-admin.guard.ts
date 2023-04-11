import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StoreService } from "../../services/data/store.service";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private store: StoreService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     if(!this.store.selectUserIsAdmin()){
       this.router.navigate(['home']).then(()=> true);
       return false;
     }
     return true;
  }

}
