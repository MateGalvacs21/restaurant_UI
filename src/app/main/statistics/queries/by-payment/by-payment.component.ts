import { Component, Input } from '@angular/core';
import { Statistics } from "../../../../shared/models/order.model";
import { PaymentQuery } from 'src/app/shared/models/payment-query.model';
import { OrderItemDTO } from 'src/app/shared/models/order-item.model';

@Component({
  selector: 'app-by-payment',
  templateUrl: './by-payment.component.html',
  styleUrls: ['./by-payment.component.scss']
})
export class ByPaymentComponent {
  @Input()
  statistics: Statistics[] = [];
  statisticList: PaymentQuery[] = [];
  items: OrderItemDTO[] = [];

  ngOnInit() : void {
    this.statistics.forEach(statistic => {
      statistic.items.forEach(item => {
        this.items.push(item);
        const paymentQuery: PaymentQuery = {
          paymentMethod : statistic.payWithCard,
          count : 1,
          amount : item.price
        }
        this.statisticList.push(paymentQuery);
      })
    })
  }
}
