import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { CustomDateTimePickerComponent } from './custom-date-time-picker.component';
import { DateTimePickerConfig } from './custom-date-time-picker.config';
import { CustomDateTimePickerService } from './custom-date-time-picker.service';

@Directive({
  selector: '[customDateTimePicker]'
})
export class PickerDirective {

  // Input to directive
  @Input() customDateTimePicker: DateTimePickerConfig;

  constructor(private viewContainer: ViewContainerRef, 
    private parentElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private pickerService: CustomDateTimePickerService)
  {}

  @HostListener('click', ['$event']) onClick(event: Event) {
    // Check if an instance of picker has been created for invoking parent
    if(!this.pickerService.pickerInstances.find(eachInstance => eachInstance.invokeElement === event.target)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDateTimePickerComponent);
      const componentRef = this.viewContainer.createComponent<CustomDateTimePickerComponent>(componentFactory);
      this.pickerService.setInstance(this.viewContainer, event.target, String(this.parentElement.nativeElement.nodeName).toLowerCase(), componentRef);
      this.passDateTimeConfig(componentRef, event.target);
    }
    else {
      this.pickerService.removeInstance(event.target);
    } 
  }

  passDateTimeConfig(componentRef, parentElement) {
    this.customDateTimePicker.invokeElement = parentElement;
    componentRef.instance.dateTimePickerConfig = this.customDateTimePicker;
  }
}
