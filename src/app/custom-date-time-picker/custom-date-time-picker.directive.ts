import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { OpenPickerEmitterConfig } from '../DateTime';

@Directive({
  selector: '[customDateTimePicker]'
})
export class PickerDirective  {

  status: boolean = false;

  @Output() openDateTimePicker = new EventEmitter<OpenPickerEmitterConfig>();

  // Emit host element details to identify the parent that invokes the picker
  @HostListener('click', ['$event']) onClick(event: Event) {
    this.status = this.toggleView(this.status);
    this.openDateTimePicker.emit({parentElement: event.target, status: this.status});
  }

  private toggleView(status: boolean): boolean {
    return !status;
  }
}
