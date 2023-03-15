import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const loggedUserObj = JSON.parse(loggedUser);
      this.authService.getLogged(loggedUserObj.id).subscribe((user) => {
        if (!user) {
          localStorage.removeItem('loggedUser');
          this.router.navigate(['login']);
          return false;
        }
        return true;
      });

      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
