import { Component, OnInit } from '@angular/core';
import { LoadingService } from "../shared/services/loading/loading.service";
import { StoreService } from "../shared/services/data/store.service";
import { RootState } from "../shared/models/root-state.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private dataService: StoreService,
    private loadingService: LoadingService,

  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.makeNavbarToggleable();
   this.dataService.fetchData().subscribe(([restaurant, statistics]) => {
     const rootState: RootState = {restaurant: restaurant, statistics: statistics};
     localStorage.setItem('rootState', JSON.stringify(rootState));
     this.loadingService.hide();
   })
  }

  private makeNavbarToggleable(): void {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    $navbarBurgers.forEach((el) => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target?.classList.toggle('is-active');
      });
    });
  }
}
