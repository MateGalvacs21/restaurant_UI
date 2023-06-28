import { Component, Input } from '@angular/core';
import { PaymentQuery } from 'src/app/shared/models/payment-query.model';

@Component({
  selector: 'app-by-payment',
  templateUrl: './by-payment.component.html',
  styleUrls: ['./by-payment.component.scss']
})
export class ByPaymentComponent {
  @Input()
  statisticList: PaymentQuery[] = [];

}
