import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { DateTimePickerConfig, DefaultTimeConstants } from './custom-date-time-picker.config';
import { CustomDateTimePicker } from './custom-date-time-picker';
import { CustomDateTimePickerService } from './custom-date-time-picker.service';

@Component({
  selector: 'custom-date-time-picker',
  templateUrl: './custom-date-time-picker.component.html',
  styleUrls: ['./custom-date-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomDateTimePickerComponent implements OnInit {

  time: Date;
  date: Date;

  isDateVisible: boolean = true; // open date picker by default
  isTimeVisible:boolean = false; // hide time picker by default
  showMeridian: boolean = false; 
  insideClickStatus = false;

  minuteStep = 1; // increments minute by 1 
  yearRange = 20; // display 20 years at a time
  yearColLimit = 4; // display calendar with 4 columns

  @Input() dateTimePickerConfig: DateTimePickerConfig;

  dateTime: string;
  defaultTimeSetting: string; // setting default time value to choose

  parentElement: EventTarget;
  invokeElementType: string;

  @ViewChild('pickerOptions') pickerOptions: ElementRef; 
  
  constructor(private pickerService: CustomDateTimePickerService) {}

  ngOnInit() {
    CustomDateTimePicker.dateTimeFormats = {
      dateTimeFormat: this.dateTimePickerConfig.dateTimeFormat, 
      dateFormat: this.dateTimePickerConfig.dateTimeFormat.split(" ")[0], 
      timeFormat: this.dateTimePickerConfig.dateTimeFormat.split(" ").slice(1, ).join(" ")
    }

    this.defaultTimeSetting = this.dateTimePickerConfig.defaultTimeCode || DefaultTimeConstants.START_OF_DAY; 

    this.showMeridian = this.dateTimePickerConfig.showMeridian;
  
    // If datetime value is not specified, current date is selected with 12:00 AM as default time
    this. dateTime =  this.dateTimePickerConfig.dateTime ?  
      this.dateTimePickerConfig.dateTime : 
      CustomDateTimePicker.assignDefaultTime(this.defaultTimeSetting, new Date(CustomDateTimePicker.currentDate()));

    this.date = new Date(this.dateTime.split(" ")[0]);

    this.time = this.dateTimePickerConfig.dateTime ?  
      new Date(CustomDateTimePicker.assignDefaultDate(this.dateTime.split(" ").slice(1, ).join(" "))) :
      new Date(CustomDateTimePicker.assignDefaultTime(this.defaultTimeSetting, this.date));
    
    this.parentElement = this.dateTimePickerConfig.invokeElement;
    this.invokeElementType = this.pickerService.getInstanceType(this.parentElement);
  }
  
  dateSelectionDone(finalDate, finalTime) {
    this.isDateVisible = false;
    this.updateDateTime(finalDate, finalTime);
    this.collapsePicker(this.parentElement, this.dateTime, this.invokeElementType);
  }

  updateDateTime(date, time) {
    this.date = date;
    this.time = time;
    this.dateTime = CustomDateTimePicker.getDateTime(date, time);
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

  /* Ignore date reset - 
      The date reset is a result of destruction of picker component on collapse. The value is reinitialized in ngOnInit to takeup current date by default.
      Persist the changes while date selection to make appropriate use of this feature i.e., sets previous time to current time while preserving date.
  */
  now() {
    console.log(this.date);
    this.time = new Date(CustomDateTimePicker.currentDateTime());
    this.dateTime = CustomDateTimePicker.getDateTime(this.date, this.time);
    this.collapsePicker(this.parentElement, this.dateTime, this.invokeElementType);
  }

  /* Ignore time reset - 
      The time reset is a result of destruction of picker component on collapse. The value is reinitialized in ngOnInit to takeup current date and time as defaultTimeSetting by default.
      Persist the changes while date selection to make appropriate use of this feature i.e., sets previous date to current date while preserving time.
  */
  today() {
    this.date = new Date(CustomDateTimePicker.currentDate());
    this.dateTime = CustomDateTimePicker.getDateTime(this.date, this.time);
    this.collapsePicker(this.parentElement, this.dateTime, this.invokeElementType);
  }
  
  clear() {
    /* Place to make API calls */
    this.collapsePicker(this.parentElement, null, this.invokeElementType)
  }

  @HostListener('document:click', ['$event']) outsideClick(event: Event) {
    if(this.parentElement !== event.target && !this.insideClickStatus && !this.pickerOptions.nativeElement.contains(event.target)) {
      this.insideClickStatus = false;
      // Retain value displaying tag if selected
      const instance = this.pickerService.getInstance(this.parentElement);
      if (this.invokeElementType !== 'input' && instance.viewContainer.length > 1) {
        for(let index = 1; index < instance.viewContainer.length; index++) {
          instance.viewContainer.remove(index);
        }
      } 
      else instance.viewContainer.clear();
      this.pickerService.checkInstanceAvailability(this.parentElement) && this.pickerService.removeInstance(this.parentElement, this.invokeElementType);
    }
    else this.insideClickStatus = false;
  }

  insideClick() {
    this.insideClickStatus = true;
  }

  collapsePicker(parentElement, dateTime, invokeElementType) {
    /* Place to make API calls */
    this.pickerService.assignSelectedValue(parentElement, dateTime, invokeElementType);
    this.pickerService.checkInstanceAvailability(parentElement) && this.pickerService.removeInstance(parentElement, invokeElementType);
  }
}
