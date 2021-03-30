import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { DateTime, DateTimePickerConfig, DateTimeValueEmitter } from '../DateTime';

@Component({
  selector: 'custom-date-time-picker',
  templateUrl: './custom-date-time-picker.component.html',
  styleUrls: ['./custom-date-time-picker.component.scss']
})
export class CustomDateTimePickerComponent implements OnInit {

  time: Date;
  date: Date;

  isDateVisible: boolean = true; // open date picker by default
  isTimeVisible:boolean = false; // hide time picker by default
  collapseDateTimePicker: boolean = false; // display or hide picker
  showMeridian: boolean = false; 

  minuteStep = 1; // increments minute by 1 
  yearRange = 20; // display 20 years at a time
  yearColLimit = 4; // display calendar with 4 columns

  @Input() dateTimePickerConfig: DateTimePickerConfig;
  @Output() datetimeSelectionComplete = new EventEmitter<DateTimeValueEmitter>();

  dateTime: string;
  defaultTimeSetting: string = "to"; // setting default time value to choose

  ngOnInit() {
    DateTime.dateTimeFormats = {
      dateTimeFormat: this.dateTimePickerConfig.dateTimeFormat, 
      dateFormat: this.dateTimePickerConfig.dateTimeFormat.split(" ")[0], 
      timeFormat: this.dateTimePickerConfig.dateTimeFormat.split(" ").slice(1, ).join(" ")
    }

    this.showMeridian = this.dateTimePickerConfig.showMeridian;
  
    this. dateTime =  this.dateTimePickerConfig.dateTime ?  
      this.dateTimePickerConfig.dateTime : 
      DateTime.assignDefaultTime(this.defaultTimeSetting, new Date(DateTime.currentDate()));

    this.date = new Date(this.dateTime.split(" ")[0]);

    this.time = this.dateTimePickerConfig.dateTime ?  
      new Date(DateTime.assignDefaultDate(this.dateTime.split(" ").slice(1, ).join(" "))) :
      new Date(DateTime.assignDefaultTime(this.defaultTimeSetting, this.date));
  }
  
  dateSelectionDone(finalDate, finalTime) {
    this.isDateVisible = false;
    this.dateTime = DateTime.getDateTime(finalDate, finalTime);

    localStorage.setItem('dateTime', this.dateTime); // update selected value
    
    this.datetimeSelectionComplete.emit({openDateTimePickerStatus: false, dateTimeValue: this.dateTime});
    this.collapseDateTimePicker = true;
  }

  showDate() {
    this.isDateVisible = true;
    this.isTimeVisible = false;
  }

  showTime() {
    this.isDateVisible = false;
    this.isTimeVisible = true;
  }

  now() {
    this.time = new Date(DateTime.currentDateTime());
    this.dateTime = DateTime.currentDateTime();
  }

  today() {
    this.date = new Date(DateTime.currentDate());
    this.dateTime = DateTime.currentDateTime();
  }
  
  clear() {
    this.dateTime = null;
    this.collapseDateTimePicker = true;
    // do something on clear displayed selected value
  }
}
