import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DateTime } from '../DateTime';

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
  showMeridian: boolean = false; // choose to use 12-hour or 24-hour clock
  showValue: boolean = false; // display selected datetime

  minuteStep = 1; // increments minute by 1 
  yearRange = 20; // display 20 years at a time
  yearColLimit = 4; // display calendar with 4 columns

  dateTime: string; // display date time after selection
  defaultTimeSetting: string = "to"; // setting default time value to choose

 
  ngOnInit() {
    if (this.dateTime) {
      this.date = new Date(this.dateTime.split(" ")[0]);
      this.time = new Date(DateTime.assignDefaultTime(this.defaultTimeSetting, this.date)); // Set default time
      this.dateTime = DateTime.assignDefaultTime(this.defaultTimeSetting, this.date);
      return;
    }
    this.date = new Date(DateTime.currentDate());
    this.time = new Date(DateTime.endOfDay(this.dateTime));
  }
  
  dateSelectionDone() {
    this.showValue = true;
    this.isDateVisible = false;
    this.collapseDateTimePicker = true;
  }
  
  updateDate() {
    if (this.date) {
      this.dateTime = DateTime.getDateTime(this.date, this.time);
    }
    // Set default time for selected date if time is not defined
    if (!this.time) {
      this.time = new Date (DateTime.assignDefaultTime(this.defaultTimeSetting, this.date));
    }
  }

  updateTime() {
    if (this.time) {
      this.dateTime = DateTime.getDateTime(this.date, this.time);
    }
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
    this.showValue = true;
  }

  today() {
    this.date = new Date(DateTime.currentDate());
    this.dateTime = DateTime.currentDateTime();
    this.showValue = true;
  }
  
  clear() {
    // do something on clear
    this.collapseDateTimePicker = true;
    this.dateTime = null;
  }
}
