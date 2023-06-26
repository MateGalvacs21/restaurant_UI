import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from "../../shared/services/data/store.service";
import { Statistics } from "../../shared/models/order.model";
import { StatisticsService } from "./service/statistics.service";
import { WrapperType } from "../../shared/models/wrapper.type";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit, OnDestroy{
  now = this.statisticService.dateString;
  statistics: Statistics[] = [];
  wrapper: WrapperType = "all";
  destroy$ = new Subject<void>();
  constructor(private storageService: StoreService, private statisticService: StatisticsService) {
  }
  ngOnInit(): void {
    this.storageService.selectStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statisticList) => {
        this.statistics = statisticList ? statisticList : [];
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeDate(value: string) {
    this.statisticService.setDate(new Date(value));
    this.statisticService.getStatistics().subscribe((stats) => {
      this.statistics = stats ? stats : [];
      localStorage.setItem('statistics', JSON.stringify(stats));
    });
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
