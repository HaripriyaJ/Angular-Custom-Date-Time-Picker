import { Directive, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';
import { OpenPickerEmitterConfig } from './custom-date-time-picker.config';

@Directive({
  selector: '[customDateTimePicker]'
})
export class PickerDirective implements OnChanges {

  status: boolean = false;

  @Input() updateToggleStatus: boolean;
  @Output() openDateTimePicker = new EventEmitter<OpenPickerEmitterConfig>();

  // Emit host element details to identify the parent that invokes the picker
  @HostListener('click', ['$event']) onClick(event: Event) {
    this.triggerPickerStatus(event);
  }

  private toggleView(status: boolean): boolean {
    return !status;
  }

  private triggerPickerStatus(event?: Event) {
    this.status = this.toggleView(this.status);
    event ? this.openDateTimePicker.emit({parentElement: event.target, status: this.status}) : this.openDateTimePicker.emit({status: this.status});
  }
  
  ngOnChanges() {
    if (this.updateToggleStatus === false) this.triggerPickerStatus();
  }
}
