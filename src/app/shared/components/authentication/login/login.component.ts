import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { LoginDTO } from "../../../models/authentication.model";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

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


  constructor(private readonly formBuilder: FormBuilder, private service: AuthenticationService, private router: Router) {
  }

  public onSubmit() {
    if (!this.loginForm.get("email")?.value || !this.loginForm.get('password')?.value) {
      prompt('Minden mezőt ki kell tölteni !');
      return;
    }
    const user: LoginDTO = {
      email: this.loginForm.get("email")?.value || '',
      password: this.loginForm.get("password")?.value || ''
    };

    this.service.login(user).pipe(
      catchError((error) => throwError(error))
    ).subscribe({
        next: login => {
          localStorage.setItem("loggedUser", JSON.stringify(login));
          this.router.navigate(["home"]);
        },
        error: error => alert('Hibás név vagy jelszó! ' + error.error.error + '!')
      }
    )
  }


}
