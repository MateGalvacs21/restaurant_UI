import { Component, Input } from '@angular/core';
import { Statistics } from "../../../../shared/models/order.model";

@Component({
  selector: 'app-by-type',
  templateUrl: './by-type.component.html',
  styleUrls: ['./by-type.component.scss']
})
export class ByTypeComponent {
  @Input()
  statistics : Statistics[] = []
}
