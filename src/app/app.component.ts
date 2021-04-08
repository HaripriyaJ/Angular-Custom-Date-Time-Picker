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
};