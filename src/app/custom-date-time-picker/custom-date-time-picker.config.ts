export const PlaceholderText = 'Datetime picker';

export const DefaultTimeConstants = {
    START_OF_DAY: 'from',
    END_OF_DAY: 'to',
    CURRENT_TIME: 'current',
    DEFAULT: 'default'
}

export interface DateTimeValueEmitterConfig {
    openDateTimePickerStatus: boolean,
    dateTimeValue: string
}

export interface DateTimePickerConfig {
    showMeridian: boolean, // choose to use 12-hour or 24-hour clock
    dateTimeFormat: string, // format date-time according to 12-hour or 24-hour clock
    dateTime?: string,
    defaultTimeCode: string,
    invokeElement: EventTarget
}