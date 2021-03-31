import { ElementRef, Injectable } from '@angular/core';

export interface PickerInstance {
  invokeElement: ElementRef,
  instance: any
}

@Injectable({
  providedIn: 'root'
})
export class CustomDateTimePickerService {

  pickerInstances:PickerInstance[] = [];

  constructor() { }
}
