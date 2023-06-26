import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogType } from "./helpers/types/dialog.type";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input()
  dialog: DialogType = {title:'', question:'', class:'primary'};
  @Output()
  answerer = new EventEmitter<void>();

  onSubmit() {
    this.answerer.emit();
  }
}
