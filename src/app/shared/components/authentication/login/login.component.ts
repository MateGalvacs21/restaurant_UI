import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { LoginDTO } from "../../../models/authentication.model";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { LoadingService } from "../../../services/loading/loading.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  public buttonAvailable = false;

  constructor(private readonly formBuilder: FormBuilder,
              private service: AuthenticationService, private router: Router,
              private loader: LoadingService,
              private toastService: ToastrService) {
  }

  public onSubmit() {
    if(!this.buttonAvailable) return;
    if (!this.loginForm.get("email")?.value || !this.loginForm.get('password')?.value) {
      this.toastService.warning('Minden mezőt ki kell tölteni !');
      return;
    }
    const user: LoginDTO = {
      email: this.loginForm.get("email")?.value || '',
      password: this.loginForm.get("password")?.value || ''
    };
    this.loader.show();
    this.service.login(user).pipe(
      catchError((error) => throwError(error))
    ).subscribe({
        next: login => {
          localStorage.setItem("loggedUser", JSON.stringify(login));
          this.router.navigate(["home"]).then(()=> true);
          this.toastService.success('Sikeres bejelentkezés! Üdvözlünk!')
        },
        error: error => {
          this.loader.hide();
          this.toastService.error('Hibás név vagy jelszó! ' + error.error.error + '!')
        },
        complete: () => this.loader.hide()
      }
    )
  }

  onChange(): void {
    this.buttonAvailable = this.valid();
  }

  private valid(): boolean {
    const email = this.loginForm.get("email")?.valid;
    const password = this.loginForm.get("password")?.valid;
    return !!(email && password);
  }
}
