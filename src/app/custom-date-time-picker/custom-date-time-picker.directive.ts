import { ComponentFactoryResolver, Directive, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { CustomDateTimePickerComponent } from './custom-date-time-picker.component';
import { DefaultTimeConstants } from './custom-date-time-picker.config';

interface PickerInstance {
  invokeElement: ElementRef,
  instance: any
}

@Directive({
  selector: '[customDateTimePicker]'
})
export class PickerDirective {

  private pickerInstances:PickerInstance[] = [];

  constructor(private viewContainer: ViewContainerRef, 
    private parentElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver)
  {}

  @HostListener('click') onClick() {
    // Check if an instance of picker has been created for invoking parent
    if(!this.pickerInstances.find(eachInstance => eachInstance.invokeElement === this.parentElement)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDateTimePickerComponent);
      const componentRef = this.viewContainer.createComponent<CustomDateTimePickerComponent>(componentFactory);

      componentRef.instance.dateTimePickerConfig = {
        showMeridian: true,
        dateTimeFormat: "DD-MMM-YYYY hh:mm a",
        dateTime: localStorage.getItem("dateTime"), // API call to get value if already selected
        defaultTimeCode: DefaultTimeConstants.END_OF_DAY,
        invokeElement: this.parentElement.nativeElement
      }
      this.pickerInstances.push({invokeElement: this.parentElement, instance: componentRef});
    }
    else {
      this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== this.parentElement); // remove instance
      this.viewContainer.clear();
    } 
  }
}
