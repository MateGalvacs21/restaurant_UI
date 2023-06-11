import { Component, OnInit } from '@angular/core';
import { MenuDTO } from "../../shared/models/menu.model";
import { DrinkGroupDTO } from "../../shared/models/drink-group.model";
import { StoreService } from "../../shared/services/data/store.service";
import { MenuEditService } from "./service/menu-edit.service";
import { ToastrService } from "ngx-toastr";
import { modalConfig } from "../../shared/components/dialog/helpers/function/modal-configuration";
import { DialogType } from "../../shared/components/dialog/helpers/types/dialog.type";

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  public menuList: MenuDTO[] = [];
  public drinkList: DrinkGroupDTO[] = [];
  public selectedMenu: MenuDTO[] =[];
  public selectedDrink: DrinkGroupDTO[] =[];
  public dialog: DialogType = {
    class:"danger",
    question: "Biztos törölni szeretnéd?",
    title: "Törlés"
  };
  constructor(private storageService: StoreService, private menuEditService: MenuEditService, private toastService: ToastrService) {
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
    modalConfig('click');
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

  deleteMenu() {
      const newMenuList = this.menuList.filter((listedMenu) => listedMenu.id !== this.selectedMenu[0].id)
    this.menuEditService.patchMenu(newMenuList).subscribe((restaurant) => {
      this.menuList = restaurant?.menu ? restaurant.menu.sort(this.compare) : [];
      this.toastService.success("Sikeres törlés!");
    })
  }

  deleteDrinkGroup() {
    const newDrinkList = this.drinkList.filter((group)=> group.nameoftype !== this.selectedDrink[0].nameoftype)
    this.menuEditService.patchDrink(newDrinkList).subscribe((restaurant) => {
      this.drinkList = restaurant?.drinks ? restaurant.drinks : [];
      this.toastService.success("Sikeres törlés!");
    })
  }

  setSelectedMenu(menu: MenuDTO) {
    this.selectedMenu = [menu];
  }

  setSelectedDrink(drink: DrinkGroupDTO) {
    this.selectedDrink = [drink];
  }
}


