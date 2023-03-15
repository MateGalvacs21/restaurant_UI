import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoggedUserDTO, LoginDTO, UserDTO} from "../../models/authentication.model";
import {ConfigurationService} from "../configuration/configuration.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  public getLogged(id: string): Observable<LoggedUserDTO> {
    return this.http.get<LoggedUserDTO>(ConfigurationService.apiURL() + '/api/authentication/' + id);
  }

  public login(user: LoginDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(ConfigurationService.apiURL() + '/api/authentication/login',user );
  }
}
