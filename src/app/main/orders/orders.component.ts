import { Component } from '@angular/core';
import { OrderService } from "./service/order.service";
import { DialogType } from "../../shared/components/dialog/helpers/types/dialog.type";
import { OrderDTO } from "../../shared/models/order.model";
import { filter, take, tap } from "rxjs";
import { ModalService } from "../../shared/services/modal/modal.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders$ = this.orderService.getOrdersByRestaurantId();
  private selectedOrder: OrderDTO[] = [];
  public dialog: DialogType = {
    class:"",
    question: ``,
    title: ""
  };
  constructor(private orderService: OrderService, private modalService: ModalService) {
  }

  public openModal(tag: string): void {
    this.modalService.openModal(tag);
  }

  public update(): void {
    this.orders$ = this.orderService.getOrdersByRestaurantId();
  }

  public deleteOrder() {
    this.orderService.deleteOrders(this.selectedOrder)
      .pipe(
        take(1),
        filter(response => response.deleteId),
        tap(() => this.update())
      ).subscribe();
  }

  public selectOrder(order: OrderDTO) {
    this.selectedOrder = [order];
  }

  public setDialogToDelete() {
    this.dialog = {
      class:"danger",
      question: `Biztos törölni szeretnéd? Ebben az esetben a rendelés nem lesz elmentve, hogy
    később statisztika készülhessen.`,
      title: `${this.selectedOrder[0].table.toUpperCase()} asztal törlése`
    }
  }
}
