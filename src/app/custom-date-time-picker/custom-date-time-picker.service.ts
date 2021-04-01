import { Injectable, ViewContainerRef } from '@angular/core';

interface PickerInstance {
  viewContainer: ViewContainerRef,
  invokeElement: EventTarget,
  invokeElementType: string,
  instance: any
}

@Injectable({
  providedIn: 'root'
})
export class CustomDateTimePickerService {

  pickerInstances:PickerInstance[] = [];

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
    const viewContainer = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement === parentElement)[0].viewContainer;
    viewContainer.clear();
    this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== parentElement);
  }

  checkInstanceAvailability(parentElement:EventTarget) {
    return this.pickerInstances.filter(eachInstance => eachInstance.invokeElement === parentElement)[0] ? true : false;
  }

  getInstanceType(parentElement:EventTarget) {
    return this.pickerInstances.filter(eachInstance => eachInstance.invokeElement === parentElement)[0].invokeElementType;
  }
}
