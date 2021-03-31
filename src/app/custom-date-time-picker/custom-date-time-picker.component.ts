import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, } from '@angular/core';
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
  insideClickStatus = false;

  minuteStep = 1; // increments minute by 1 
  yearRange = 20; // display 20 years at a time
  yearColLimit = 4; // display calendar with 4 columns

  @Input() dateTimePickerConfig: DateTimePickerConfig;
  @Output() selectionComplete = new EventEmitter<DateTimeValueEmitter>();
  @Output() toggleView = new EventEmitter<boolean>();

  dateTime: string;
  defaultTimeSetting: string; // setting default time value to choose

  parentElement: EventTarget;

  @ViewChild('pickerOptions') pickerOptions: ElementRef; 

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
    
    this.defaultTimeSetting = this.dateTimePickerConfig.defaultTimeCode || "from"; 
    this.parentElement = this.dateTimePickerConfig.invokeElement;

    this.toggleView.emit(true);
  }
  
  dateSelectionDone(finalDate, finalTime) {
    this.isDateVisible = false;
    this.updateDateTime(finalDate, finalTime);
    this.collapsePicker();
  }

  updateDateTime(date, time) {
    this.date = date;
    this.time = time;
    this.dateTime = DateTime.getDateTime(date, time);
    this.insideClick();
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
    this.dateTime = DateTime.getDateTime(this.date, this.time);
    this.collapsePicker();
  }

  today() {
    this.date = new Date(DateTime.currentDate());
    this.dateTime = DateTime.getDateTime(this.date, this.time);
    this.collapsePicker();
  }
  
  clear() {
    this.collapseDateTimePicker = true;
    this.selectionComplete.emit({openDateTimePickerStatus: false, dateTimeValue: null});

    /* API call */
    localStorage.removeItem('dateTime');
  }

  @HostListener('document:click', ['$event']) outsideClick(event: Event) {
    if(this.parentElement !== event.target && !this.insideClickStatus && !this.pickerOptions.nativeElement.contains(event.target)) {
      this.insideClickStatus = false;
      this.collapsePicker();
    }
    else this.insideClickStatus = false;
  }

  insideClick() {
    this.insideClickStatus = true;
  }

  collapsePicker() {
    /* API call */
    localStorage.setItem('dateTime', this.dateTime);

    this.selectionComplete.emit({openDateTimePickerStatus: false, dateTimeValue: this.dateTime});
    this.collapseDateTimePicker = true;
    this.toggleView.emit(false);
  }
}
