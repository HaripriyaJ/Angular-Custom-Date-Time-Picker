import { Component } from '@angular/core';
import { DateTimePickerConfig, DateTimeValueEmitterConfig, OpenPickerEmitterConfig } from './custom-date-time-picker/custom-date-time-picker.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  status;
  dateTime;

  // Inputs to picker
  dateTimePickerConfig: DateTimePickerConfig;

  // Inputs to Directive
  updateToggleStatus: boolean;

  constructor() {
    this.dateTime = localStorage.getItem("dateTime"); // API call to get value if already selected
    this.updateConfig();
  }
  
  openPicker(e: OpenPickerEmitterConfig) {
    this.updateConfig(e.parentElement); // can be avoided when integrated with API call
    return e.status
  }

  afterPickerValueSelection(e: DateTimeValueEmitterConfig) {
    this.updateConfig(); // can be avoided when integrated with API call
    return e.dateTimeValue;
  } 

  private updateConfig(invokeElement?) {
    this.dateTimePickerConfig = {
      showMeridian: true,
      dateTimeFormat: "DD-MMM-YYYY hh:mm a",
      dateTime: localStorage.getItem("dateTime"), // API call to get value if already selected
      defaultTimeCode: "to",
      invokeElement: invokeElement
    }
  }

  toggleView(status: boolean) {
    this.updateToggleStatus = status;
  }
};