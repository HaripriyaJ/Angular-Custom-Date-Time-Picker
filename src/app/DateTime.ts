declare var moment;
export interface DateTimeValueEmitter {
    openDateTimePickerStatus: boolean,
    dateTimeValue: string
}
export interface DateTimePickerConfig {
    showMeridian: boolean, // choose to use 12-hour or 24-hour clock
    dateTimeFormat: string, // format date-time according to 12-hour or 24-hour clock
    dateTime?: string,
}
export interface DateTimeFormats {
    dateTimeFormat: string,
    dateFormat: string,
    timeFormat: string
}
export class DateTime {

    static dateTimeFormats: DateTimeFormats = {
        dateTimeFormat: "",
        dateFormat: "",
        timeFormat: ""
    }

    set dateTimeFormats(format: DateTimeFormats) {
        DateTime.dateTimeFormats = format;
    }

    static currentTime(): string {
        return moment().format(DateTime.dateTimeFormats.timeFormat);
    }

    static currentDate(): string {
        return moment().format(DateTime.dateTimeFormats.dateFormat);
    }

    static currentDateTime(): string {
        return moment().format(DateTime.dateTimeFormats.dateTimeFormat);
    }

    static startOfDay(date: any): string {
        return moment(date).startOf('day').format(DateTime.dateTimeFormats.dateTimeFormat);
    }

    static endOfDay(date: any): string {
        return moment(date).endOf('day').format(DateTime.dateTimeFormats.dateTimeFormat);
    }

    static getDateTime(date?: Date, time?: Date): string {
        let extractedDate, extractedTime;
        date == null ? (extractedDate = moment().format(DateTime.dateTimeFormats.dateFormat)) : (extractedDate = this.extractDate(date));
        time == null ? (extractedTime = moment().format(DateTime.dateTimeFormats.timeFormat)) : (extractedTime = this.extractTime(time));
        return `${extractedDate} ${extractedTime}`;
    }

    static extractDate(date: any) {
        return moment(date).format(DateTime.dateTimeFormats.dateFormat);
    }

    static extractTime(time: any) {
        return moment(time).format(DateTime.dateTimeFormats.timeFormat);
    }

    static assignDefaultTime(type: string, date:Date) {
        /*
            Argument 'type' can take the following arguments:
            i. to - end of day is considered i.e., 11:59 PM or 23:59 is set
            ii. from - start of day is considered i.e., 12:00 AM or 00:00 is set
            iii. default - start of day is considered i.e., 12:00 AM or 00:00 is set
            iii. current - current time is set
        */
        if(type === 'to') {
            return this.getDateTime(date, new Date(this.endOfDay(date)));
        }
        else if(type === 'from') {
            return this.getDateTime(date, new Date(this.startOfDay(date)));
        }
        else if (type === 'default') {
            return this.getDateTime(date, new Date(this.startOfDay(date)));
        }
        else if (type === 'current') {
            return this.getDateTime(date, new Date(this.currentDateTime()));
        }
        else {
            throw new Error('Invalid type argument');
        }
    }

    static assignDefaultDate(time: string) {
        return moment(`${this.currentDate()} ${time}`, DateTime.dateTimeFormats.dateTimeFormat).format(DateTime.dateTimeFormats.dateTimeFormat);
    }
}