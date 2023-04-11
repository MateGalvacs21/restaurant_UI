import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Statistics } from "../../../shared/models/order.model";
import { ConfigurationService } from "../../../shared/services/configuration/configuration.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly restaurantId = this.getId();
  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics[] | null> {
    if(!this.restaurantId) return of(null);
    return this.http.get<Statistics[]>(ConfigurationService.apiURL() + "/api/statistics/" + this.restaurantId);
  }

  private getId(): string {
    const restaurant = localStorage.getItem("restaurant");
    if (!restaurant) return "";
    return JSON.parse(restaurant).restaurantId;
  }
}
