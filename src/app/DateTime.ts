declare var moment;
export class DateTime {
    static currentTime(): string {
        return moment().format("HH:mm");
    }

    static currentDate(): string {
        return moment().format("YYYY-MMM-DD")
    }

    static currentDateTime(): string {
        return moment().format("YYYY-MMM-DD HH:mm")
    }

    static startOfDay(date: any): string {
        return moment(date).startOf('day').format("YYYY-MMM-DD HH:mm");
    }

    static endOfDay(date: any): string {
        return moment(date).endOf('day').format("YYYY-MMM-DD HH:mm");
    }

    static getDateTime(date?: Date, time?: Date): string {
        let extractedDate, extractedTime;
        date == null ? (extractedDate = moment().format("YYYY-MMM-DD")) : (extractedDate = this.extractDate(date));
        time == null ? (extractedTime = moment().format("HH:mm")) : (extractedTime = this.extractTime(time));
        return `${extractedDate} ${extractedTime}`;
    }

    static extractDate(date: any) {
        return moment(date).format("YYYY-MMM-DD");
    }

    static extractTime(time: any) {
        return moment(time).format("HH:mm");
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
}