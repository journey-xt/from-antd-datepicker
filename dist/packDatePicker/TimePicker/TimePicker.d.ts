import { PureComponent } from "react";
import moment, { Moment } from "moment";
interface Props {
    format: string;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    value?: string | number | Moment | Date;
    timePickerOnOpenChange: (status: boolean) => void;
    datePickerOnOpenChange: (status: boolean) => void;
    timeOnChange: (time: any) => void;
    disabledHours?: () => Array<number>;
    disabledMinutes?: () => Array<number>;
    disabledSeconds?: () => Array<number>;
}
interface State {
    value: Moment;
}
declare class TimePicker extends PureComponent<Props, State> {
    static defaultProps: {
        hourStep: number;
        minuteStep: number;
        secondStep: number;
        format: string;
    };
    constructor(props: any);
    static getDerivedStateFromProps(props: any): {
        value: moment.Moment | undefined;
    };
    formatRender: (format: any) => string;
    formatStep: (format: any) => {
        step: number;
        max: number;
        value: string;
        disabledTime: (() => number[]) | undefined;
        hour: number;
        minute: number;
    };
    handleOnChange: (timeStr: string, format: any) => void;
    timeChangeSetTime: (format: any, time: any, timeStr: any) => any;
    splitSymbol: any;
    render(): JSX.Element;
}
export default TimePicker;
