import { Component } from '@angular/core';
import { OrderService } from "./service/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders$ = this.orderService.getOrdersByRestaurantId();

  constructor(private orderService: OrderService) {
  }

  public update(): void {
    this.orders$ = this.orderService.getOrdersByRestaurantId();
  }
}
