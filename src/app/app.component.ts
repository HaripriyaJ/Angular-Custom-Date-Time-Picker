import { Component, Input } from '@angular/core';
import { DateTimePickerConfig, DateTimeValueEmitter } from './DateTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  status;

  dateTimePickerConfig: DateTimePickerConfig = {
    showMeridian: true,
    dateTimeFormat: "YYYY-MMM-DD hh:mm a",
    dateTime: localStorage.getItem("dateTime")
  }

  dateTime = this.dateTimePickerConfig.dateTime;
  
  handle(e) {
    return e
  }

  selectionDone(e: DateTimeValueEmitter) {
    return e.dateTimeValue;
  } 
};