import { Component, Injectable, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PlaceholderText } from './custom-date-time-picker.config';

interface PickerInstance {
  viewContainer: ViewContainerRef,
  invokeElement: EventTarget,
  invokeElementType: string,
  instance: any
}

@Injectable({
  providedIn: 'root'
})

@Component({
  template: `
    <ng-template #template let-dateTime='dateTime'>
      <span class="inline-bold">{{dateTime}}</span>
    </ng-template>
  `
})

export class CustomDateTimePickerService {

  pickerInstances:PickerInstance[] = [];
  @ViewChild('template') _template: TemplateRef<any>;

  constructor() { }

  setInstance(viewContainer: ViewContainerRef, invokeElement: EventTarget, invokeElementType: string, instance: any) {
    this.pickerInstances.push({
      viewContainer: viewContainer, 
      invokeElement: invokeElement, 
      invokeElementType: invokeElementType,
      instance: instance
    });
  }

  removeInstance(parentElement:EventTarget) {
    const viewContainer = this.getInstance(parentElement).viewContainer;
    viewContainer.clear();
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
      parentElement.placeholder = dateTime || PlaceholderText;
    }
    else {
      // insert new template ?
      const instance = this.getInstance(parentElement);
      const viewContainer = instance.viewContainer;
    }
  }
}
