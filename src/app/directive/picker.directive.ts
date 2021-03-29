import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appPicker]'
})
export class PickerDirective {

  constructor() { }

  @HostListener('click') onClick() {
  }

}
