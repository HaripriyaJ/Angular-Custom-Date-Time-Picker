import { Component, Input } from '@angular/core';
import { DateTimePickerConfig, DateTimeValueEmitter, OpenPickerEmitterConfig } from './DateTime';

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
    this.updateConfig();
  }
  
  openPicker(e: OpenPickerEmitterConfig) {
    this.updateConfig(e.parentElement);
    return e.status
  }

  afterPickerValueSelection(e: DateTimeValueEmitter) {
    this.updateConfig();
    return e.dateTimeValue;
  } 

  private updateConfig(invokeElement?) {
    this.dateTimePickerConfig = {
      showMeridian: true,
      dateTimeFormat: "YYYY-MMM-DD hh:mm a",
      dateTime: localStorage.getItem("dateTime"),
      invokeElement: invokeElement
    }
  }

  toggleView(status: boolean) {
    this.updateToggleStatus = status;
  }
};