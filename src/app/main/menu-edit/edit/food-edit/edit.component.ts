import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MenuDTO } from "../../../../shared/models/menu.model";
import { StoreService } from "../../../../shared/services/data/store.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Afa } from "../../../../shared/models/coin.model";
import { MenuEditService } from "../../service/menu-edit.service";
import { RootState } from "../../../../shared/models/root-state.model";
import { LoadingService } from "../../../../shared/services/loading/loading.service";
import { ToastrService } from "ngx-toastr";
import { modalConfig } from "../../../../shared/components/dialog/helpers/function/modal-configuration";
import { DialogType } from "../../../../shared/components/dialog/helpers/types/dialog.type";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  menuEdited: string | null = '';
  menuItems: string[] = [];
  menuList: MenuDTO[] = [];
  supportedTypes = ["Leves", "foetel", "martas", "desszert", "salata"];
  supportedAfa = [5, 27];
  buttonAvailable = false;
  deletedItem = '';
  public dialog: DialogType = {
    class:"danger",
    question: "Biztos törölni szeretnéd?",
    title: "Törlés"
  };
  public menuForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    nickname: ['', [Validators.required]],
    price: ['', [Validators.required]],
    type: ['', [Validators.required]],
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
    this.activatedRoute.paramMap.subscribe((param) => {
      this.menuEdited = param.get("id");
    });
    this.storeService.selectRestaurant().subscribe((restaurant) => {
      this.menuList = restaurant?.menu ? restaurant.menu : [];
      if (this.menuEdited) {
        this.loadMenu(restaurant?.menu.find((menuItem) => menuItem.id === this.menuEdited));
      }
    })
    modalConfig('click');
  }

  onSubmit() {
    this.saveEditing();
    setTimeout(() => this.cancelEditing(), 1000);
  }

  onTypeChange(event: any) {
    this.menuForm.get("type")?.setValue(event.target.value);
  }

  onAfaChange(event: any) {
    this.menuForm.get("afa")?.setValue(event.target.value);
  }

  private loadMenu(menu: MenuDTO | undefined) {
    if (!menu) {
      this.router.navigate(["menu-edit/edit/menu"]).then();
    }
    this.menuForm.get('name')?.setValue(menu?.name ? menu.name : null);
    this.menuForm.get('nickname')?.setValue(menu?.nickname ? menu.nickname : null);
    this.menuForm.get('price')?.setValue(menu?.price ? menu.price.toString() : null);
    this.menuForm.get('type')?.setValue(menu?.type ? menu.type : null);
    this.menuForm.get('afa')?.setValue(menu?.afa ? menu.afa.toString() : null);
    this.menuItems = menu?.items ? menu.items : [];
  }

  addItem(item: string) {
    let haveItem = false;
    this.menuItems.forEach((listItem) => {
      if (listItem.toUpperCase() === item.toUpperCase()) {
        haveItem = true;
        this.toastService.error("Ez a hozzávaló már szerepel a listában!");
      }
    });
    if (!haveItem) {
      this.menuItems.push(item);
    }
  }

  deleteItem(item: string) {
    this.menuItems = this.menuItems.filter((listItem) => listItem !== item);
  }

  buttonChange(str: string) {
    this.buttonAvailable = !!str;
  }

  cancelEditing() {
    this.router.navigate(['menu-edit']).then();
  }

  saveEditing() {
    if (this.valid()) {
      const menu: MenuDTO = {
        name: this.menuForm.value.name ? this.menuForm.value.name : '',
        nickname: this.menuForm.value.nickname ? this.menuForm.value.nickname : '',
        price: this.menuForm.value.price ? parseInt(this.menuForm.value.price) : 0,
        afa: this.menuForm.value.afa ? parseInt(this.menuForm.value.afa) as Afa : 0 as Afa,
        type: this.menuForm.value.type ? this.menuForm.value.type : '',
        items: this.menuItems,
        id: this.menuEdited ? this.menuEdited : this.generateId()
      }
      const searchedItem = this.menuList.find(menuItems => menuItems.id === menu.id);
      this.loadingService.show();
      if (searchedItem) {
        const index = this.menuList.findIndex(item => item.id === searchedItem.id);
        this.menuList[index] = menu;
      } else {
        this.menuList.push(menu);
      }

      this.menuEditService.patchMenu(this.menuList).subscribe(() => this.loadingService.hide());
      this.dataService.fetchData().subscribe(([restaurant, statistics]) => {
        const rootState: RootState = {
          restaurant: restaurant ? {...restaurant, menu: this.menuList} : restaurant,
          statistics: statistics
        };
        localStorage.setItem('rootState', JSON.stringify(rootState));
        this.toastService.success("Sikeres mentés!");
      })
    } else {
      this.toastService.error("Hibás kiröltés!");
      return;
    }
  }

  setDeletedItem(item: string) {
    this.deletedItem = item;
  }
  private valid(): boolean {
    const name = this.menuForm.get("name")?.valid;
    const nickname = this.menuForm.get("nickname")?.valid;
    const price = this.menuForm.get("price")?.valid;
    const type = this.menuForm.get("type")?.valid;
    const afa = this.menuForm.get("afa")?.valid;
    return !!(name && nickname && price && type && afa);
  }

  private generateId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }
}
