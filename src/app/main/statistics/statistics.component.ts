import { Component, OnDestroy, OnInit } from '@angular/core';
import { Statistics } from "../../shared/models/order.model";
import { StatisticsService } from "./service/statistics.service";
import { WrapperType } from "../../shared/models/wrapper.type";
import { Subject, takeUntil } from "rxjs";
import { TypeQuery } from "../../shared/models/type-query.model";
import { OrderItemDTO } from "../../shared/models/order-item.model";
import { PaymentQuery } from "../../shared/models/payment-query.model";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit, OnDestroy {
  now = this.statisticService.dateString;
  statistics: Statistics[] = [];
  wrapper: WrapperType = "all";
  destroy$ = new Subject<void>();
  paymentQueries: PaymentQuery[] = [];
  typeQueries: TypeQuery[] = [];
  types: string[] = [];
  items: OrderItemDTO[] = [];

  constructor(private statisticService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticService.getStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statisticList) => {
        this.statistics = statisticList ? statisticList : [];
        this.createDataByType();
        this.createPaymentData();
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeDate(value: string) {
    this.statisticService.setDate(new Date(value));
    this.statisticService.getStatistics().pipe(takeUntil(this.destroy$)).subscribe((stats) => {
      this.statistics = stats ? stats : [];
      localStorage.setItem('statistics', JSON.stringify(stats));
      this.createDataByType();
      this.createPaymentData();
    });
  }

  public createDataByType() {
    this.statistics.forEach(statistic => {
      statistic.items.forEach(item => {
        this.items.push(item);
      })
    })
    this.items.forEach(item => {
      if (!this.types.find(type => type === item.type)) {
        this.types.push(item.type);
        const typeQuery: TypeQuery = {
          foodType: item.type,
          count: 1,
          amount: item.price,
          afa5: item.afa === 5 ? item.price : 0,
          afa27: item.afa === 27 ? item.price : 0
        }
        this.typeQueries.push(typeQuery);
      } else {
        const index = this.typeQueries.findIndex(typeQuery => typeQuery.foodType === item.type);
        this.typeQueries[index] = {
          ...this.typeQueries[index],
          count: this.typeQueries[index].count + 1,
          amount: this.typeQueries[index].amount + item.price,
          afa5: item.afa === 5 ? this.typeQueries[index].afa5 + item.price : this.typeQueries[index].afa5,
          afa27: item.afa === 27 ? this.typeQueries[index].afa27 + item.price : this.typeQueries[index].afa27
        }
      }
    })
  }

  public createPaymentData() {
    if (this.statistics.length !== 0) {
      this.paymentQueries = [
        {
          paymentMethod: true,
          count: 0,
          amount: 0
        },
        {
          paymentMethod: false,
          count: 0,
          amount: 0
        }];
    }
    this.statistics.forEach(statistic => {
        if (statistic.payWithCard) {
          this.paymentQueries[0].count++;
          this.paymentQueries[0].amount += statistic.amount;
        } else {
          this.paymentQueries[1].count++;
          this.paymentQueries[1].amount += statistic.amount;
        }
      }
    )
  }

  setAll() {
    this.wrapper = "all";
  }

  setType() {
    this.wrapper = "type";
  }

  setPayment() {
    this.wrapper = "payment";
  }
}
