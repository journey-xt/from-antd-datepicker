import { PureComponent } from "react";
import moment from "moment";
import { Moment } from "moment/moment.d";
import { PickerValue } from "./typeing";
import { ValueType, ValueStatus } from "./enum";
export interface SingleDatePickerProps {
    format?: string;
    selectTodayAfter?: boolean;
    showTime?: boolean;
    valueStatus?: ValueStatus;
    defaultPickerValue?: Moment;
    showToday?: boolean;
    valueType?: "timeStamp" | "timeString" | "moment";
    value?: string | number | Moment | Date;
    onChange?: (value: PickerValue | null, ValueStatus?: any) => void;
    placeholder?: string;
    disabledDate?: (currentDate: Moment | undefined, valueStatus?: ValueStatus) => boolean;
    disabledHours?: (currentDate: Moment, valueStatus?: ValueStatus) => Array<number>;
    disabledMinutes?: (currentDate: Moment, valueStatus?: ValueStatus) => Array<number>;
    disabledSeconds?: (currentDate: Moment, valueStatus?: ValueStatus) => Array<number>;
}
declare type State = {
    currentDate: Moment;
    dateLayer: boolean;
    timeFormat: string;
    value?: string | number | Moment | Date;
};
declare class SingleDatePicker extends PureComponent<SingleDatePickerProps, State> {
    timeLayer: boolean;
    constructor(props: any);
    static getDerivedStateFromProps(props: any, state: any): {
        value: any;
        timeFormat: any;
    };
    static defaultProps: {
        valueType: ValueType;
        format: string;
    };
    disabledDate: (currentDate: moment.Moment | undefined) => boolean;
    timeStampBack: (date: moment.Moment | null, valueStatus?: ValueStatus | undefined) => string | number | moment.Moment | null;
    onChange: (date: moment.Moment | null, dateString: string) => void;
    disabledHours: () => number[];
    disabledMinutes: () => number[];
    disabledSeconds: () => number[];
    renderExtraFooter: () => JSX.Element | null;
    timeOnChange: (time: any) => void;
    pickerConfirm: () => void;
    onOpenChange: (status: boolean) => void;
    timePickOnOpenChange: (status: any) => void;
    render(): JSX.Element;
}
export default SingleDatePicker;
