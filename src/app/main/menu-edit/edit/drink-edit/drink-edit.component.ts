import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../../../shared/services/data/store.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MenuEditService } from "../../service/menu-edit.service";
import { LoadingService } from "../../../../shared/services/loading/loading.service";
import { DrinkItemDTO } from "../../../../shared/models/drink-item.model";
import { DrinkGroupDTO } from "../../../../shared/models/drink-group.model";
import { Afa } from "../../../../shared/models/coin.model";
import { RootState } from "../../../../shared/models/root-state.model";
import { ToastrService } from "ngx-toastr";

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
  public drinkForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    afa: ['', [Validators.required]]
  })
  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private readonly formBuilder: FormBuilder,
              private router: Router,
              private menuEditService: MenuEditService,
              private dataService: StoreService,
              private loadingService: LoadingService,
              private toastService: ToastrService) {
  }
  ngOnInit(): void {
    this.modalConfig();
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

      this.menuEditService.patchDrink(this.drinkList).subscribe(() => this.loadingService.hide());
      this.dataService.fetchData().subscribe(([restaurant, statistics]) => {
        const rootState: RootState = {
          restaurant: restaurant ? {...restaurant, drinks: this.drinkList} : restaurant,
          statistics: statistics
        };
        localStorage.setItem('rootState', JSON.stringify(rootState));
        this.toastService.success('Sikeres mentés!');
      })
    } else {
      this.toastService.error("Hibás kitöltés!");
      return;
    }
  }

  saveAndClose() {
    this.saveEditing();
    setTimeout(() => this.cancelEditing(), 1000);
  }

  private loadDrink(drink: DrinkGroupDTO | undefined) {
    if (!drink) {
      this.router.navigate(["menu-edit/edit/drink"]).then();
    }
    this.drinkForm.get('name')?.setValue(drink?.name ? drink.name : null);
    this.drinkForm.get('afa')?.setValue(drink?.afa ? drink.afa.toString() : null);
    this.drinkItems = drink?.items ? drink.items : [];
  }
  private modalConfig() {
    document.addEventListener('click', () => {
      function openModal($el: any) {
        $el.classList.add('is-active');
      }

      function closeModal($el: any) {
        $el.classList.remove('is-active');
      }

      function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
          closeModal($modal);
        });
      }

      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger: any) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      });

      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
          closeModal($target);
        });
      });

      document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) {
          closeAllModals();
        }
      });
    });
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
