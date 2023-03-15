import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public static apiURL(): string | undefined {

    return "https://restaurant-manaement-dev.onrender.com";
  }
}
