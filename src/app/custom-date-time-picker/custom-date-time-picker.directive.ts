import { ComponentFactoryResolver, Directive, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { CustomDateTimePickerComponent } from './custom-date-time-picker.component';
import { DefaultTimeConstants } from './custom-date-time-picker.config';
import { CustomDateTimePickerService, PickerInstance } from './custom-date-time-picker.service';

@Directive({
  selector: '[customDateTimePicker]'
})
export class PickerDirective {

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

      componentRef.instance.dateTimePickerConfig = {
        showMeridian: true,
        dateTimeFormat: "DD-MMM-YYYY hh:mm a",
        dateTime: localStorage.getItem("dateTime"), // API call to get value if already selected
        defaultTimeCode: DefaultTimeConstants.END_OF_DAY,
        invokeElement: this.parentElement.nativeElement
      }
      this.pickerService.pickerInstances.push({invokeElement: this.parentElement, instance: componentRef});
    }
    else {
      this.pickerService.pickerInstances = this.pickerService.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== this.parentElement); // remove instance
      this.viewContainer.clear();
    } 
  }
}
