import { Component, OnInit } from '@angular/core';
import { MenuDTO } from "../../shared/models/menu.model";
import { DrinkGroupDTO } from "../../shared/models/drink-group.model";
import { StoreService } from "../../shared/services/data/store.service";
import { MenuEditService } from "./service/menu-edit.service";
import { DrinkItemDTO } from "../../shared/models/drink-item.model";

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  public menuList: MenuDTO[] = [];
  public drinkList: DrinkGroupDTO[] = [];

  constructor(private storageService: StoreService, private menuEditService: MenuEditService) {
  }

  ngOnInit() {
    this.storageService.selectRestaurant().subscribe((restaurant) => {
      if (!restaurant) {
        this.menuList = [];
        this.drinkList = [];
        return;
      }
      this.menuList = restaurant.menu.sort(this.compare);
      this.drinkList = restaurant.drinks;
    })
  }

  compare(a: MenuDTO, b: MenuDTO) {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    return 0;
  }

  deleteMenu(inputMenu: MenuDTO) {
      const newMenuList = this.menuList.filter((listedMenu) => listedMenu.id !== inputMenu.id)

    this.menuEditService.patchMenu(newMenuList).subscribe((restaurant) => {
      this.menuList = restaurant?.menu ? restaurant.menu.sort(this.compare) : [];
    })
  }

  deleteDrink(nameOfType:string, inputDrink: DrinkItemDTO) {
   const drinkGroup = this.drinkList.findIndex((drinkGroup) => drinkGroup.nameoftype === nameOfType);
   const drinkItem = this.drinkList[drinkGroup].items.findIndex((item)=> item.id === inputDrink.id);
   const newDrinkItems = this.drinkList[drinkGroup].items.slice(0,drinkItem);
   this.drinkList[drinkGroup].items = newDrinkItems;
    this.menuEditService.patchDrink(this.drinkList).subscribe((restaurant) => {
      this.drinkList = restaurant?.drinks ? restaurant.drinks : [];
    })
  }
}


