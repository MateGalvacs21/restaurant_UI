import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MenuDTO } from "../../../shared/models/menu.model";
import { DrinkGroupDTO } from "../../../shared/models/drink-group.model";
import { StoreService } from "../../../shared/services/data/store.service";
import { Selector } from "../../../shared/models/selector.type";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  menuEdited: string | null = '';
  drinkEdited: string | null = '';
  selectorToggle: Selector = "select";
  item?: MenuDTO | DrinkGroupDTO;

  constructor(private activatedRoute: ActivatedRoute, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.menuEdited = param.get("id");
      this.drinkEdited = param.get("nameoftype");
    });
    if (this.menuEdited) {
      this.storeService.selectRestaurant().subscribe((restaurant) => {
        this.item = restaurant?.menu.find((menuItem) => menuItem.id === this.menuEdited);
        this.selectorToggle = "menu" ;
      })
    }
    if(this.drinkEdited) {
      this.storeService.selectRestaurant().subscribe((restaurant) => {
        this.item = restaurant?.drinks.find((drink) => drink.nameoftype === this.drinkEdited);
        this.selectorToggle = 'drink';
      })
    }

  }

}
