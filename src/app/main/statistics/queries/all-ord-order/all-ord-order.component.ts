import { Component, Input } from '@angular/core';
import { Statistics } from "../../../../shared/models/order.model";

@Component({
  selector: 'app-all-ord-order',
  templateUrl: './all-ord-order.component.html',
  styleUrls: ['./all-ord-order.component.scss']
})
export class AllOrdOrderComponent {
@Input()
  statistics : Statistics[] = [];
}
