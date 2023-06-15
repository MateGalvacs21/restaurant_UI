import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { LoadingService } from "../../shared/services/loading/loading.service";
import { StoreService } from "../../shared/services/data/store.service";
import { ToastrService } from "ngx-toastr";
import { modalConfig } from "../../shared/components/dialog/helpers/function/modal-configuration";
import { DialogType } from "../../shared/components/dialog/helpers/types/dialog.type";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isAdmin: boolean = false;
  dialog: DialogType = {
    title: "Kilépés",
    question: "Biztos kiakarsz lépni?",
    class: "warning"
  }

  constructor(private authService: AuthenticationService,
              private router: Router,
              private loader: LoadingService,
              private store: StoreService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.store.selectUserIsAdmin();
    modalConfig('mouseenter');
  }

  public logOut(): void {
    const userId = this.getId();
    this.loader.show();
    this.authService.logout(userId).subscribe({
      next: () => {
        localStorage.removeItem('menuList');
        localStorage.removeItem('drinks');
        localStorage.removeItem('statistics');
        localStorage.removeItem("loggedUser");
        this.loader.hide();
        this.router.navigate(['login']).then(() => true);
      },
      error: () => {
        this.loader.hide();
        this.toast.error("Szerverhiba! ☹")
      }
    })
  }

  getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user) return "";
    return JSON.parse(user).id;
  }
}
