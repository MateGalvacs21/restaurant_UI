import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {
    document.addEventListener('click' ,() => {
      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
          this.closeModal($target);
        });
      });
    })
  }
  openModal(tag: string) {
    const modal = document.getElementById(tag);
    if (!modal){
      return;
    }
    modal.classList.add('is-active');
  }

   closeModal($el: any) {
    $el.classList.remove('is-active');
  }
}
