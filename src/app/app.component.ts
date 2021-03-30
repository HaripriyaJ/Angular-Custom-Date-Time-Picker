import { Component } from '@angular/core';
import { DateTimePickerConfig, DateTimeValueEmitter } from './DateTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  status;
  dateTimePickerConfig: DateTimePickerConfig;
  dateTime;

  constructor() {
    this.updateConfig();
  }
  
  handle(e) {
    return e
  }

  selectionDone(e: DateTimeValueEmitter) {
    this.updateConfig();
    return e.dateTimeValue;
  } 

  private updateConfig() {
    this.dateTimePickerConfig = {
      showMeridian: true,
      dateTimeFormat: "YYYY-MMM-DD hh:mm a",
      dateTime: localStorage.getItem("dateTime")
    }
  }
};