import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { DatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CustomDateTimePickerDirective } from "./custom-date-time-picker/custom-date-time-picker.directive";
import { CustomDateTimePickerComponent } from "./custom-date-time-picker/custom-date-time-picker.component";
import { CustomDateTimeValueTemplate } from "./custom-date-time-picker/custom-date-time-value-template.component";

@NgModule({
  declarations: [
    AppComponent, 
    CustomDateTimePickerDirective, 
    CustomDateTimePickerComponent, 
    CustomDateTimeValueTemplate
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomDateTimePickerComponent, 
    CustomDateTimeValueTemplate
  ]
})
export class AppModule {}
