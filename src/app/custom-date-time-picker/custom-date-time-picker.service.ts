import { ComponentFactoryResolver, Injectable, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PlaceholderText } from './custom-date-time-picker.config';
import { CustomDateTimeValueTemplate } from './custom-date-time-value-template.component';

interface PickerInstance {
  viewContainer: ViewContainerRef,
  invokeElement: EventTarget,
  invokeElementType: string,
  instance: any,
  embeddedView:any
}

@Injectable({
  providedIn: 'root'
})

export class CustomDateTimePickerService {

  pickerInstances:PickerInstance[] = [];
  @ViewChild('template') _template: TemplateRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setInstance(viewContainer: ViewContainerRef, invokeElement: EventTarget, invokeElementType: string, instance: any, embeddedView: any) {
    this.pickerInstances.push({
      viewContainer: viewContainer, 
      invokeElement: invokeElement, 
      invokeElementType: invokeElementType,
      instance: instance,
      embeddedView: embeddedView
    });
  }

  removeInstance(parentElement:EventTarget, invokeElementType: string) {
    const viewContainer = this.getInstance(parentElement).viewContainer;
    if (invokeElementType === 'input')  {
      viewContainer.clear()
      this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== parentElement);
    }
  }

  checkInstanceAvailability(parentElement:EventTarget) {
    return this.getInstance(parentElement) ? true : false;
  }

  getInstance(parentElement:EventTarget) {
    return this.pickerInstances.filter(eachInstance => eachInstance.invokeElement === parentElement)[0];
  }

  getInstanceType(parentElement:EventTarget) {
    return this.pickerInstances.filter(eachInstance => eachInstance.invokeElement === parentElement)[0].invokeElementType;
  }

  assignSelectedValue(parentElement:any, dateTime: string, invokeElementType: string) {
    if(invokeElementType === 'input') {
      parentElement.placeholder = dateTime || PlaceholderText;
    }
    else {
      const instance = this.getInstance(parentElement);
      instance.viewContainer.clear();
      if(dateTime) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDateTimeValueTemplate);
        const componentRef = instance.viewContainer.createComponent<CustomDateTimeValueTemplate>(componentFactory, 0);
        componentRef.instance.dateTime = dateTime;
        instance.embeddedView = componentRef;
      }
      this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== parentElement);
    }
  }
}