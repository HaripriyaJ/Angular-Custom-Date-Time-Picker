import { Component } from '@angular/core';
import { DefaultTimeConstants } from './custom-date-time-picker/custom-date-time-picker.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  dateTime;
  
  pickerConfig = {
    showMeridian: true,
    dateTimeFormat: "YYYY-MMM-DD hh:mm a",
    dateTime: null, // API call to get value if already selected
    defaultTimeCode: DefaultTimeConstants.END_OF_DAY
  }

  pickerConfig1 = {
    showMeridian: true,
    dateTimeFormat: "YYYY-MMM-DD hh:mm a",
    dateTime: "2021-Apr-24 11:35", // API call to get value if already selected
    defaultTimeCode: DefaultTimeConstants.END_OF_DAY,
    minDate: new Date("2021-Apr-24 11:35")
  }

  // Get selected output
  pickerValue($event) {
    console.log($event)
  }
};