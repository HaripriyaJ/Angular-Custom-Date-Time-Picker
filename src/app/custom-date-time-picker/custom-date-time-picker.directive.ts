import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { CustomDateTimePickerComponent } from './custom-date-time-picker.component';
import { DateTimePickerConfig } from './custom-date-time-picker.config';
import { CustomDateTimePickerService } from './custom-date-time-picker.service';

@Directive({
  selector: '[customDateTimePicker]'
})
export class CustomDateTimePickerDirective implements OnInit {

  // Input to directive
  @Input() customDateTimePicker: DateTimePickerConfig;
  @Output() pickerValue = new EventEmitter<string>();

  constructor(
    private viewContainer: ViewContainerRef, 
    private parentElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private pickerService: CustomDateTimePickerService
  ){}

  @HostListener('click', ['$event']) onClick(event: Event) {
    const type = String(this.parentElement.nativeElement.nodeName).toLowerCase();
    // Check if an instance of picker has been created for invoking parent
    if(!this.pickerService.pickerInstances.find(eachInstance => eachInstance.invokeElement === event.target)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDateTimePickerComponent);
      const componentRef = this.viewContainer.createComponent<CustomDateTimePickerComponent>(componentFactory);
      this.pickerService.setInstance(this.viewContainer, event.target, type, componentRef, null);
      this.passDateTimeConfig(componentRef, event.target);
    }
    else {
      if( type === 'input') {
        this.pickerService.removeInstance(event.target, type);
      } 
      else {
        const instance = this.pickerService.getInstance(this.parentElement.nativeElement);
        // Retain value displaying tag if selected
        instance.viewContainer.length > 1 ? instance.viewContainer.remove(1) : instance.viewContainer.clear();
        this.pickerService.removeInstance(event.target, type);
      }
    } 
  }

  passDateTimeConfig(componentRef, parentElement) {
    this.customDateTimePicker.invokeElement = parentElement;
    componentRef.instance.dateTimePickerConfig = this.customDateTimePicker;
  }

  ngOnInit() {
    this.pickerService.pickerValue.subscribe(value => this.pickerValue.emit(value));
  }
}
