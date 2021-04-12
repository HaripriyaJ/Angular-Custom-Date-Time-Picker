import { ComponentFactoryResolver, Injectable, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CustomDateTimeValueTemplate } from './custom-date-time-value-template.component';
import { Subject } from 'rxjs';

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

  pickerValue = new Subject<string>();

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
      viewContainer.clear();
    }
    this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== parentElement);
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
      parentElement.value = dateTime || null;
    }
    else {
      const instance = this.getInstance(parentElement);
      instance.viewContainer.clear(); // removes date-time picker instance from the view container for non-input tags (i.e, div, span etc)
      if(dateTime) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomDateTimeValueTemplate);
        const componentRef = instance.viewContainer.createComponent<CustomDateTimeValueTemplate>(componentFactory, 0);
        componentRef.instance.dateTime = dateTime;
        instance.embeddedView = componentRef;
      }
      this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== parentElement);
    }
    this.pickerValue.next(dateTime);
  }
}
