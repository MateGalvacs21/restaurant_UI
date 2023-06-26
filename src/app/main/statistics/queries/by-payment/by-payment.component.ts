import { Component, Input } from '@angular/core';
import { Statistics } from "../../../../shared/models/order.model";

@Component({
  selector: 'app-by-payment',
  templateUrl: './by-payment.component.html',
  styleUrls: ['./by-payment.component.scss']
})
export class ByPaymentComponent {
  @Input()
  statistics : Statistics[] = []
}
