import { Component } from '@angular/core';

@Component({
  selector: 'date-time-value-template',
  template: `<div class="inline-bold">{{dateTime}}</div>`,
  styles:[`
    .inline-bold {
      font-weight: bolder;
    }
  `]
})

export class CustomDateTimeValueTemplate {
  dateTime;
}
