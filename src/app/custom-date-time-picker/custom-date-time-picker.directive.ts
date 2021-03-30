import { Directive, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[customDateTimePicker]'
})
export class PickerDirective  {

  status: boolean = false;

  @Output() openDateTimePicker = new EventEmitter<boolean>();

  @HostListener('click') onClick() {
    this.status = this.toggleView(this.status);
    this.openDateTimePicker.emit(this.status);
  }

  private toggleView(status: boolean): boolean {
    return !status;
  }
}
