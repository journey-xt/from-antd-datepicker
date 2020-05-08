import React from "react";
import "moment/locale/zh-cn";
import { Moment } from "moment/moment.d";
import { PickerValue } from "./typeing";
import { ValueType, ValueStatus } from "./enum";
export interface SingleDatePickerProps {
    format?: string | string[];
    selectTodayAfter?: boolean;
    showTime?: boolean;
    valueStatus?: ValueStatus;
    disabledDate?: (currentDate: Moment | undefined, valueStatus?: ValueStatus) => boolean;
    valueType?: ValueType;
    onChange?: (value?: PickerValue, valueStatus?: ValueStatus) => void;
    defaultPickerValue?: Moment;
    showToday?: boolean;
    value?: string | number | Moment | Date;
}
declare const _default: React.ForwardRefExoticComponent<SingleDatePickerProps & React.RefAttributes<unknown>>;
export default _default;
