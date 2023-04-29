import { Component , OnInit} from '@angular/core';
import { MenuDTO } from "../../shared/models/menu.model";
import { DrinkGroupDTO } from "../../shared/models/drink-group.model";
import { StoreService } from "../../shared/services/data/store.service";

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  public menuList: MenuDTO[] = [];
  public drinkList: DrinkGroupDTO[] = [];
  constructor(private storageService:StoreService) {
  }
  ngOnInit() {
    this.storageService.selectRestaurant().subscribe((restaurant)=> {
      if (!restaurant){
        this.menuList = [];
        this.drinkList = [];
        return;
      }
      this.menuList = restaurant.menu.sort(this.compare);
      this.drinkList = restaurant.drinks;
    })
  }

  compare( a: MenuDTO, b: MenuDTO ) {
    if ( a.type < b.type ){
      return -1;
    }
    if ( a.type > b.type ){
      return 1;
    }
    return 0;
  }
}
