import { Component } from '@angular/core';
import { AuthenticationService } from "../../shared/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { LoadingService } from "../../shared/services/loading/loading.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private authService: AuthenticationService, private router: Router, private loader: LoadingService) {
  }

  public logOut(): void {
    if (!window.confirm("Biztos ki szeretne lépni?")) return;
    const userId = this.getId();
    this.loader.show();
    this.authService.logout(userId).subscribe({
      next: () => {
        localStorage.removeItem('rootState');
        localStorage.removeItem("loggedUser");
        this.loader.hide();
        this.router.navigate(['login']).then(() => true);
      },
      error: () => {
        this.loader.hide();
        alert('Internal Server Error!');
      }
    })
  }

  private getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user) return "";
    return JSON.parse(user).id;
  }
}
