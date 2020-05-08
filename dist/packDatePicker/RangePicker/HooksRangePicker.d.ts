/// <reference types="react" />
import { Moment } from "moment/moment.d";
import { RangePickerValue } from "./typeing";
import { ValueStatus, ValueType } from "../SingleDatePicker";
interface Props {
    disabledDate?: (currentDate: Moment | undefined, valueStatus?: ValueStatus) => boolean;
    selectTodayAfter?: boolean;
    valueStatus?: ValueStatus;
    format?: string | string[];
    valueType?: ValueType;
    onChange?: (value: RangePickerValue) => void;
    showToday?: boolean;
    value?: RangePickerValue;
}
declare const RangePicker: (props: Props) => JSX.Element;
export default RangePicker;
