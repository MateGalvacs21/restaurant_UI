import { Component, Input } from '@angular/core';
import { TypeQuery } from 'src/app/shared/models/type-query.model';

@Component({
  selector: 'app-by-type',
  templateUrl: './by-type.component.html',
  styleUrls: ['./by-type.component.scss']
})
export class ByTypeComponent {
  @Input()
  statisticsList: TypeQuery[] = [];

}
