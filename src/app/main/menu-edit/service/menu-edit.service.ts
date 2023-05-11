import { Injectable } from '@angular/core';
import { ConfigurationService } from "../../../shared/services/configuration/configuration.service";
import { Observable, of } from "rxjs";
import { RestaurantDTO } from "../../../shared/models/restaurant.model";
import { HttpClient } from "@angular/common/http";
import { MenuDTO } from "../../../shared/models/menu.model";
import { DrinkGroupDTO } from "../../../shared/models/drink-group.model";

@Injectable({
  providedIn: 'root'
})
export class MenuEditService {
private readonly id = this.getId();
  constructor(private http: HttpClient) { }

  public getRestaurant(): Observable<RestaurantDTO | null>{
    if(!this.id) return of(null);
    return this.http.get<RestaurantDTO>(ConfigurationService.apiURL()+'/api/restaurant/'+this.id);
  }

  private getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user) return "";
    return JSON.parse(user).restaurantId;
  }

  public patchMenu(updatedMenu: MenuDTO[]): Observable<RestaurantDTO | null>{
    if(!this.id) return of(null);
    return this.http.patch<RestaurantDTO>(ConfigurationService.apiURL() + '/api/restaurant/' + this.id + '/menu', {menu: updatedMenu});
  }

  public patchDrink(updatedDrink: DrinkGroupDTO[]): Observable<RestaurantDTO | null>{
    if(!this.id) return of(null);
    return this.http.patch<RestaurantDTO>(ConfigurationService.apiURL() + '/api/restaurant/' + this.id + '/drink', {drinks: updatedDrink});
  }
}
