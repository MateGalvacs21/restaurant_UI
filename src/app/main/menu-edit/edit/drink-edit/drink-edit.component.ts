import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../../../shared/services/data/store.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MenuEditService } from "../../service/menu-edit.service";
import { LoadingService } from "../../../../shared/services/loading/loading.service";
import { DrinkItemDTO } from "../../../../shared/models/drink-item.model";
import { DrinkGroupDTO } from "../../../../shared/models/drink-group.model";
import { Afa } from "../../../../shared/models/coin.model";
import { ToastrService } from "ngx-toastr";
import { modalConfig } from "../../../../shared/components/dialog/helpers/function/modal-configuration";
import { DialogType } from "../../../../shared/components/dialog/helpers/types/dialog.type";

@Component({
  selector: 'app-drink-edit',
  templateUrl: './drink-edit.component.html',
  styleUrls: ['./drink-edit.component.scss']
})
export class DrinkEditComponent implements OnInit{
  drinkEdit: string | null = '';
  drinkItems: DrinkItemDTO[] = [];
  drinkList: DrinkGroupDTO[] = [];
  supportedAfa = [5, 27];
  modalConfig = {title: "Ital szerkesztése az ital csoportban", button: 'Szerkesztés mentése'};
  deletedItem: DrinkItemDTO = {name:'', price:parseInt(''), id: ''};
  public dialog: DialogType = {
    class:"danger",
    question: "Biztos törölni szeretnéd?",
    title: "Törlés"
  };
  selectedDrinkItem: DrinkItemDTO = {id: '', price: parseInt(''), name: ''};
  public drinkForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    afa: ['', [Validators.required]]
  })
  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private readonly formBuilder: FormBuilder,
              private router: Router,
              private menuEditService: MenuEditService,
              private loadingService: LoadingService,
              private toastService: ToastrService) {
  }
  ngOnInit(): void {
    modalConfig('mouseenter');
    this.activatedRoute.paramMap.subscribe((param) => {
      this.drinkEdit = param.get("id");
    });
    this.storeService.selectRestaurant().subscribe((restaurant) => {
      this.drinkList = restaurant?.drinks ? restaurant.drinks : [];
      if(this.drinkEdit) {
        this.loadDrink(restaurant?.drinks.find((drinkItem) => drinkItem.nameoftype === this.drinkEdit));
      }
    })
  }

  onAfaChange(event: any) {
    this.drinkForm.get("afa")?.setValue(event.target.value);
  }

  addItem(newItem: DrinkItemDTO) {
    this.drinkItems.push(newItem);
  }

  deleteItem(item: DrinkItemDTO) {
    this.drinkItems = this.drinkItems.filter((listItem) => listItem.id !== item.id);
  }

  cancelEditing() {
    this.router.navigate(['menu-edit']).then();
  }

  saveEditing() {
    if (this.valid()) {
      const drink: DrinkGroupDTO = {
        name: this.drinkForm.value.name ? this.drinkForm.value.name : '',
        afa: this.drinkForm.value.afa ? parseInt(this.drinkForm.value.afa) === 27 ? 27: 5 : 0 as Afa,
        items: this.drinkItems,
        nameoftype: this.drinkEdit ? this.drinkEdit : this.generateId()
      }
      const searchedItem = this.drinkList.find(drinkItems => drinkItems.nameoftype === drink.nameoftype);
      this.loadingService.show();
      if (searchedItem) {
        const index = this.drinkList.findIndex(item => item.nameoftype === searchedItem.nameoftype);
        this.drinkList[index] = drink;
      } else {
        this.drinkList.push(drink);
      }

      this.menuEditService.patchDrink(this.drinkList).subscribe((restaurant) => {
        const store  = localStorage.getItem('rootState');
        if (!store){
          this.toastService.error("Szerverhiba! 😶");
          return;
        }
        const newState = {
          restaurant: restaurant,
          statistics: JSON.parse(store).statistics
        };
        localStorage.setItem('rootState', JSON.stringify(newState));
        this.toastService.success("Sikeres mentés!");
        this.loadingService.hide();
      });
    } else {
      this.toastService.error("Hibás kitöltés!");
      return;
    }
  }

  saveAndClose() {
    this.saveEditing();
    setTimeout(() => this.cancelEditing(), 500);
  }

  setEditedDrinkItem(item: DrinkItemDTO) {
    this.selectedDrinkItem = item;
  }
  setDeletedDrinkItem(item: DrinkItemDTO) {
    this.deletedItem = item;
  }
  editDrinkItem(item: DrinkItemDTO) {
    const index = this.drinkItems.findIndex((listItem) => listItem.id === item.id);
    this.drinkItems[index] = item;
  }

  private loadDrink(drink: DrinkGroupDTO | undefined) {
    if (!drink) {
      this.router.navigate(["menu-edit/edit/drink"]).then();
    }
    this.drinkForm.get('name')?.setValue(drink?.name ? drink.name : null);
    this.drinkForm.get('afa')?.setValue(drink?.afa ? drink.afa.toString() : null);
    this.drinkItems = drink?.items ? drink.items : [];
  }

  private generateId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

  private valid(): boolean {
    const name = this.drinkForm.get("name")?.valid;
    const afa = this.drinkForm.get("afa")?.valid;
    return !!(name && afa);
  }
}
