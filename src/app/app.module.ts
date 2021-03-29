import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AlertModule} from 'ngx-bootstrap/alert';
import { PopoverModule} from 'ngx-bootstrap/popover';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PickerDirective } from './directive/picker.directive';
import { CustomDateTimePickerComponent } from './custom-date-time-picker/custom-date-time-picker.component'

@NgModule({
  declarations: [
    AppComponent,
    PickerDirective,
    CustomDateTimePickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
