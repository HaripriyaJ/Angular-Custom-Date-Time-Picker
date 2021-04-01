import { DefaultTimeConstants } from "./custom-date-time-picker.config";

declare var moment;

interface DateTimeFormats {
    dateFormat: string,
    timeFormat: string,
    dateTimeFormat: string
}

export class CustomDateTimePicker {

    static dateTimeFormats: DateTimeFormats = {
        dateTimeFormat: "",
        dateFormat: "",
        timeFormat: ""
    }

    set dateTimeFormats(format: DateTimeFormats) {
        CustomDateTimePicker.dateTimeFormats = format;
    }

    static currentTime(): string {
        return moment().format(CustomDateTimePicker.dateTimeFormats.timeFormat);
    }

    static currentDate(): string {
        return moment().format(CustomDateTimePicker.dateTimeFormats.dateFormat);
    }

    static currentDateTime(): string {
        return moment().format(CustomDateTimePicker.dateTimeFormats.dateTimeFormat);
    }

    static startOfDay(date: any): string {
        return moment(date).startOf('day').format(CustomDateTimePicker.dateTimeFormats.dateTimeFormat);
    }

    static endOfDay(date: any): string {
        return moment(date).endOf('day').format(CustomDateTimePicker.dateTimeFormats.dateTimeFormat);
    }

    static getDateTime(date?: Date, time?: Date): string {
        let extractedDate, extractedTime;
        date == null ? (extractedDate = moment().format(CustomDateTimePicker.dateTimeFormats.dateFormat)) : (extractedDate = this.extractDate(date));
        time == null ? (extractedTime = moment().format(CustomDateTimePicker.dateTimeFormats.timeFormat)) : (extractedTime = this.extractTime(time));
        return `${extractedDate} ${extractedTime}`;
    }

    static extractDate(date: any) {
        return moment(date).format(CustomDateTimePicker.dateTimeFormats.dateFormat);
    }

    static extractTime(time: any) {
        return moment(time).format(CustomDateTimePicker.dateTimeFormats.timeFormat);
    }

    static assignDefaultTime(type: string, date:Date) {
        /*
            Argument 'type' can take the following values:
            i. END_OF_DAY - 11:59 PM or 23:59 is set
            ii. START_OF_DAY - 12:00 AM or 00:00 is set
            iii. DEFAULT - 12:00 AM or 00:00 is set
            iii. CURRENT_TIME - current time is set
        */

        if(type === DefaultTimeConstants.END_OF_DAY) {
            return this.getDateTime(date, new Date(this.endOfDay(date)));
        }
        else if(type === DefaultTimeConstants.START_OF_DAY) {
            return this.getDateTime(date, new Date(this.startOfDay(date)));
        }
        else if (type === DefaultTimeConstants.DEFAULT) {
            return this.getDateTime(date, new Date(this.startOfDay(date)));
        }
        else if (type === DefaultTimeConstants.CURRENT_TIME) {
            return this.getDateTime(date, new Date(this.currentDateTime()));
        }
        else {
            throw new Error('Invalid type argument. Valid arguments are START_OF_DAY, END_OF_DAY, DEFAULT, and CURRENT_TIME');
        }
    }

    static assignDefaultDate(time: string) {
        return moment(`${this.currentDate()} ${time}`).format(CustomDateTimePicker.dateTimeFormats.dateTimeFormat);
    }
}