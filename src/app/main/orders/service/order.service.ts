import { Injectable } from '@angular/core';
import { ConfigurationService } from "../../../shared/services/configuration/configuration.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { OrderDTO } from "../../../shared/models/order.model";
import { StatisticsService } from "../../statistics/service/statistics.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly restaurantId = this.getId();

  constructor(private configurationService: ConfigurationService, private http: HttpClient, private statService: StatisticsService ) { }

  public getOrdersByRestaurantId(): Observable<OrderDTO[] | null> {
    if(!this.restaurantId) return of(null);
    return this.http.get<OrderDTO[]>(ConfigurationService.apiURL() + "/api/order/restaurant/" + this.restaurantId);
  }

  public getOrdersByTable(table: string): Observable<OrderDTO[] | null> {
    if(!this.restaurantId) return of(null);
    return this.http.get<OrderDTO[]>(ConfigurationService.apiURL() + "/api/order/table/" + table);
  }

  public deleteOrders(orders: OrderDTO[]): Observable<any | null> {
    if(!this.restaurantId) return of(null);
      return this.http.delete<OrderDTO[]>(ConfigurationService.apiURL() + "/api/order/" + orders[0].id);
  }

  private getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user) return "";
    return JSON.parse(user).restaurantId;
  }
}
