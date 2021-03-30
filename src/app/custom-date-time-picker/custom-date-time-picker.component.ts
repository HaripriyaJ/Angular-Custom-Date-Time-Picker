import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { DateTime } from '../DateTime';

export interface DateTimeValueEmitter {
  openDateTimePickerStatus: boolean,
  dateTimeValue: string
}

export interface DateTimePickerConfig {
  showMeridian: boolean, // choose to use 12-hour or 24-hour clock
  dateTimeFormat: string, // format date-time according to 12-hour or 24-hour clock
  dateTime?: string, // pre-fetch value if available
}
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

  @Input() dateTimePickerConfig: string;
  @Output() datetimeSelectionComplete = new EventEmitter<DateTimeValueEmitter>();

  dateTime: string =  localStorage.getItem("dateTime") !== null ?  localStorage.getItem("dateTime") : DateTime.currentDateTime();
  defaultTimeSetting: string = "to"; // setting default time value to choose

  ngOnInit() {
    console.log(this.dateTimePickerConfig)
    if (this.dateTime) {
      this.date = new Date(this.dateTime.split(" ")[0]);
      this.time = new Date(DateTime.assignDefaultTime(this.defaultTimeSetting, this.date)); // Set default time
      this.dateTime = DateTime.assignDefaultTime(this.defaultTimeSetting, this.date);
      return;
    }
    this.date = new Date(DateTime.currentDate());
    this.time = new Date(DateTime.endOfDay(this.dateTime));
  }
  
  dateSelectionDone(finalDate, finalTime) {
    this.isDateVisible = false;
    this.dateTime = DateTime.getDateTime(finalDate, finalTime);
    console.log(this.dateTime)
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
