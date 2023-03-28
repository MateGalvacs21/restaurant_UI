import { Component } from '@angular/core';
import { AuthenticationService } from "../../shared/services/authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  public logOut(): void {
    if (!window.confirm("Biztos ki szeretne lépni?")) return;
    const userId = this.getId();
    this.authService.logout(userId).subscribe({
      next: () => {
        localStorage.removeItem("loggedUser");
        this.router.navigate(['login']).then(() => true);
      },
      error: () => alert('Internal Server Error!')
    })
  }

  private getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user) return "";
    return JSON.parse(user).id;
  }
}
