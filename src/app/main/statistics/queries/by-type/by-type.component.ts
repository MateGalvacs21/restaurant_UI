import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from "../../../../shared/models/order.model";
import { TypeGuery } from 'src/app/shared/models/type-query.model';
import { OrderItemDTO } from 'src/app/shared/models/order-item.model';

@Component({
  selector: 'app-by-type',
  templateUrl: './by-type.component.html',
  styleUrls: ['./by-type.component.scss']
})
export class ByTypeComponent implements OnInit {
  @Input()
  statistics: Statistics[] = [];
  statisticsList: TypeGuery[] = [];
  types: string[] = [];
  items: OrderItemDTO[] = [];

  ngOnInit(): void {
    this.statistics.forEach(statistic => {
      statistic.items.forEach(item => {
        this.items.push(item);
      })
    })
    this.items.forEach(item => {
      if (!this.types.find(type => type === item.type)) {
        this.types.push(item.type);
        const typeQuery: TypeGuery = {
          foodType: item.type,
          count: 1,
          amount: item.price,
          afa5: item.afa === 5 ? item.price : 0,
          afa27: item.afa === 27 ? item.price : 0
        }
        this.statisticsList.push(typeQuery);
      }
      else {
        const index = this.statisticsList.findIndex(typeQuery => typeQuery.foodType === item.type);
        this.statisticsList[index] = {
          ...this.statisticsList[index],
          count: this.statisticsList[index].count + 1,
          amount: this.statisticsList[index].amount + item.price,
          afa5: item.afa === 5 ? this.statisticsList[index].afa5 + item.price : this.statisticsList[index].afa5,
          afa27: item.afa === 27 ? this.statisticsList[index].afa27 + item.price : this.statisticsList[index].afa27
        }
      }
    })
  }
}
