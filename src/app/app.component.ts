import { Component } from '@angular/core';
import { DefaultTimeConstants, PlaceholderText } from './custom-date-time-picker/custom-date-time-picker.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  dateTime;
  
  placeholderText = PlaceholderText;
  
  pickerConfig = {
    showMeridian: true,
    dateTimeFormat: "DD-MMM-YYYY hh:mm a",
    dateTime: "02-Apr-2021 11:59 pm", // API call to get value if already selected
    defaultTimeCode: DefaultTimeConstants.END_OF_DAY
  }
};