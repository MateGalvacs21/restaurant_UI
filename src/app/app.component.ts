import { Component } from '@angular/core';
import { LoadingService } from "./shared/services/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$ = this.loader.isLoading$;
  constructor(private loader: LoadingService) { }
}
