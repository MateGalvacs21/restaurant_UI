import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../shared/services/data/store.service";
import { Statistics } from "../../shared/models/order.model";
import { StatisticsService } from "./service/statistics.service";
import { WrapperType } from "../../shared/models/wrapper.type";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit{
  now = this.statisticService.dateString;
  statistics: Statistics[] = [];
  wrapper: WrapperType = "all";
  constructor(private storageService: StoreService, private statisticService: StatisticsService) {
  }
  ngOnInit(): void {
    this.storageService.selectStatistics()
      .subscribe((statisticList) => {
        this.statistics = statisticList ? statisticList : [];
        console.log(this.statistics)
      })
    console.log(this.now);
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
