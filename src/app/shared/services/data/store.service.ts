import { Injectable } from '@angular/core';
import { MenuEditService } from "../../../main/menu-edit/service/menu-edit.service";
import { StatisticsService } from "../../../main/statistics/service/statistics.service";
import { combineLatest, Observable, of} from "rxjs";
import { RestaurantDTO } from "../../models/restaurant.model";
import { Statistics } from "../../models/order.model";
import { UserDTO } from "../../models/authentication.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private menuService: MenuEditService, private statisticsService: StatisticsService) { }

  fetchData() {
    return combineLatest(this.menuService.getRestaurant(),this.statisticsService.getStatistics());
  }

  selectRestaurant(): Observable<RestaurantDTO | null> {
    const store = localStorage.getItem('rootState');
    if(!store) return of(null);
    return of(JSON.parse(store).restaurant);
  }

  selectStatistics(): Observable<Statistics | null> {
    const store = localStorage.getItem('rootState');
    if(!store) return of(null);
    return of(JSON.parse(store).statistics)
  }

  selectUser(): Observable<UserDTO | null> {
    const store = localStorage.getItem('loggedUser');
    if (!store) return of(null);
    return of(JSON.parse(store));
  }

  selectUserIsAdmin(): boolean {
    const store = localStorage.getItem('loggedUser');
    if (!store) return false;
    return JSON.parse(store).isAdmin;
  }
}
