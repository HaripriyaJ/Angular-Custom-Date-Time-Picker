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

  @HostListener('click') onClick() {
    // Check if an instance of picker has been created for invoking parent
    if(!this.pickerService.pickerInstances.find(eachInstance => eachInstance.invokeElement === this.parentElement)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDateTimePickerComponent);
      const componentRef = this.viewContainer.createComponent<CustomDateTimePickerComponent>(componentFactory);
      this.pickerService.setInstance(this.viewContainer, this.parentElement, componentRef);
      this.passDateTimeConfig(componentRef);
    }
    else {
      this.pickerService.removeInstance(this.parentElement);
    } 
  }

  passDateTimeConfig(componentRef) {
    this.customDateTimePicker.invokeElement = this.parentElement.nativeElement;
    componentRef.instance.dateTimePickerConfig = this.customDateTimePicker;
  }
}
