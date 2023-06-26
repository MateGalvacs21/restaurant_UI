import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DrinkItemDTO } from "../../../../../shared/models/drink-item.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-drink-edit-modal',
  templateUrl: './drink-edit-modal.component.html',
  styleUrls: ['./drink-edit-modal.component.scss']
})
export class DrinkEditModalComponent implements OnChanges{
  @Input()
  drinkItem: DrinkItemDTO = {id: '', name: '', price: parseInt('')};
  @Input()
  baseModalConfig = {title: "Ital hozzáadása az ital csoporthoz", button: 'Ital hozzáadás'};

  @Output()
  newDrinkItem = new EventEmitter<DrinkItemDTO>();
  buttonAvailable = false;
  public drinkItemForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]]
  })
  constructor(private readonly formBuilder: FormBuilder, private toastService: ToastrService) {
  }

  ngOnChanges(): void {
    this.drinkItemForm.get("name")?.setValue(this.drinkItem.name);
    this.drinkItemForm.get("price")?.setValue(this.drinkItem.price.toString());
  }

  buttonAvailableChange() {
    this.buttonAvailable = !!(this.drinkItemForm.value.name && this.drinkItemForm.value.price);
  }

  save() {
    if(this.valid()){
      const drinkItem: DrinkItemDTO = {
        name: this.drinkItemForm.value.name ? this.drinkItemForm.value.name : '',
        price: this.drinkItemForm.value.price ? parseInt(this.drinkItemForm.value.price) : 0 ,
        id: this.drinkItem ? this.drinkItem.id : this.generateId()
      }
      this.newDrinkItem.emit(drinkItem);
      this.toastService.success('Sikeres hozzáadás !')
      this.cancel();
    }
    else {
      this.toastService.error("Hibás kitöltés!")
    }
  }

  cancel() {
    this.drinkItemForm.get("name")?.setValue('');
    this.drinkItemForm.get("price")?.setValue('');
  }

  private generateId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

  private valid(): boolean {
    const name = this.drinkItemForm.get("name")?.valid;
    const price = this.drinkItemForm.get("price")?.valid;
    return !!(name && price);
  }
}
