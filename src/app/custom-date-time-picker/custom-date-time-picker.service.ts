import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';

export interface PickerInstance {
  viewContainer: ViewContainerRef,
  invokeElement: ElementRef,
  instance: any
}

@Injectable({
  providedIn: 'root'
})
export class CustomDateTimePickerService {

  pickerInstances:PickerInstance[] = [];

  constructor() { }

  setInstance(viewContainer: ViewContainerRef, invokeElement: ElementRef, instance: any) {
    this.pickerInstances.push({
      viewContainer: viewContainer, 
      invokeElement: invokeElement, 
      instance: instance
    });
  }

  removeInstance(parentElement:ElementRef) {
    const viewContainer = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement === parentElement)[0].viewContainer;
    viewContainer.clear();
    this.pickerInstances = this.pickerInstances.filter(eachInstance => eachInstance.invokeElement !== parentElement);
  }
}
