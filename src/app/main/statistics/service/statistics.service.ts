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
  private date: string = this.createDateString(new Date());

  public setDate(date: Date) {
    this.date = this.createDateString(date);
  }

  get dateString(): string {
    return this.date;
  }
  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics[] | null> {
    if(!this.restaurantId) return of(null);
    return this.http.get<Statistics[]>(ConfigurationService.apiURL() + "/api/statistics/" + this.restaurantId + '/' + this.date);
  }

  postStatistics(id: string, payWithCard: boolean): Observable<any> {
    if(!this.restaurantId) return of(null);
    return this.http.post<Statistics[]>(ConfigurationService.apiURL() + "/api/statistics/" + id + '/' + payWithCard,{});
  }

  private getId(): string {
    const user = localStorage.getItem("loggedUser");
    if (!user) return "";
    return JSON.parse(user).restaurantId;
  }

  private createDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' :''}${date.getMonth() + 1}-${date.getDate()}`;
  }
}
