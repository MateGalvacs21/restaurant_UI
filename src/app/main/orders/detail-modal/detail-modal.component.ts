import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDTO } from "../../../shared/models/order.model";
import { printerTemplate } from "../printer/printer-template";

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent {
  @Input()
  order: OrderDTO[] = [];
  @Input()
  state: string = '';
  @Output()
  payWithCard = new EventEmitter<boolean>();
  @Output()
  orderEnd = new EventEmitter<void>();
  card = false;
  printing() {
    printerTemplate(this.order);
    this.onEmitted();
    this.onSubmit();
  }

  onEmitted() {
    this.payWithCard.emit(this.card);
  }

  onSubmit() {
    this.orderEnd.emit();
  }

  setToggle(checked: boolean) {
    this.card = checked;
  }
}
