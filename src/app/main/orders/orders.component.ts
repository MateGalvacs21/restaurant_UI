import { Component, ViewChild } from '@angular/core';
import { OrderService } from "./service/order.service";
import { DialogType } from "../../shared/components/dialog/helpers/types/dialog.type";
import { OrderDTO } from "../../shared/models/order.model";
import { filter, take, tap } from "rxjs";
import { ModalService } from "../../shared/services/modal/modal.service";
import { ToastrService } from "ngx-toastr";
import { StatisticsService } from "../statistics/service/statistics.service";
import { DetailModalComponent } from "./detail-modal/detail-modal.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  @ViewChild(DetailModalComponent) details!: DetailModalComponent;
  orders$ = this.orderService.getOrdersByRestaurantId();
  detailsCloseState = '';
  dialog: DialogType = {
    class: "",
    question: ``,
    title: ""
  };
  selectedOrder: OrderDTO[] = [];
  payment = false;

  constructor(private orderService: OrderService,
              private modalService: ModalService,
              private toast: ToastrService,
              private statistics: StatisticsService) {
  }

  public openModal(tag: string): void {
    this.modalService.openModal(tag);
  }

  setPayment(payWithCard: boolean) {
    this.payment = payWithCard;
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

  public close() {
    this.statistics.postStatistics(this.selectedOrder[0].id, this.payment)
      .pipe(
        filter(response => response.stored),
        tap(()=> this.deleteOrder()),
        tap(()=> this.update()),
        tap(()=> this.modalService.closeModal(document.getElementById('details-close'))),
        tap(()=> this.toast.success("Sikeresen lezártad a rendelést! 😊")),
        tap(() => this.details.card = false)
      ).subscribe();
  }

  public selectOrder(order: OrderDTO) {
    this.selectedOrder = [order];
  }

  public setDetailsClose(state: string) {
    this.detailsCloseState = state;
  }

  public setDialogToDelete() {
    this.dialog = {
      class: "danger",
      question: `Biztos törölni szeretnéd? Ebben az esetben a rendelés nem lesz elmentve, hogy
    később statisztika készülhessen.`,
      title: `${this.selectedOrder[0].table.toUpperCase()} asztal törlése`
    }
  }
}
