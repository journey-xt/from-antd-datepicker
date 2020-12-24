import { Component } from "react";
import moment from "moment";
import { Moment } from "moment/moment.d";
import { PickerValue } from "../SingleDatePicker/typeing";
import { ValueType, ValueStatus } from "../SingleDatePicker/enum";
import { RangePickerValue } from "./typeing";
declare type Props = {
    placeholder?: string[];
    disabled?: [boolean, boolean] | boolean;
    allowClear?: [boolean, boolean] | boolean;
    disabledDate?: (currentDate: Moment | undefined, valueStatus?: ValueStatus) => boolean;
    selectTodayAfter?: boolean;
    valueStatus?: ValueStatus;
    format?: string;
    valueType?: "timeStamp" | "timeString" | "moment";
    value?: RangePickerValue;
    onChange?: (value: RangePickerValue) => void;
    showToday?: boolean;
    getCalendarContainer?: (triggerNode: Element) => HTMLElement;
};
declare type State = {
    value: RangePickerValue;
    currentDate: Moment;
};
declare class RangePicker extends Component<Props, State> {
    constructor(props: any);
    static defaultProps: {
        valueType: ValueType;
        format: string;
        valueStatus: ValueStatus;
        showToday: boolean;
    };
    static getDerivedStateFromProps(props: any): {
        value: {
            start: any;
            end: any;
        };
    };
    disabledDate: (currentDate: Moment | undefined, valueStatus?: ValueStatus | undefined) => boolean;
    onChange: (value: PickerValue | null, valueStatus?: ValueStatus | undefined) => void;
    disabledHours: (currentDate: any, valueStatus?: ValueStatus | undefined) => number[];
    disabledMinutes: (currentDate: Moment, valueStatus?: ValueStatus | undefined) => number[];
    disabledSeconds: (currentDate: Moment, valueStatus?: ValueStatus | undefined) => number[];
    createArray: (start: number, end: number) => number[];
    timeDefaultPickerValue: (type: any) => moment.Moment;
    render(): JSX.Element;
}
export default RangePicker;
