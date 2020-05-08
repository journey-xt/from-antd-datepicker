import { PureComponent, RefObject } from "react";
import { Input } from "antd";
interface Props {
    value: string;
    format: string;
    max: number;
    step: number;
    hour: number;
    minute: number;
    onChange?: (value: string, format: string) => void;
    timePickerOnOpenChange: (status: boolean) => void;
    datePickerOnOpenChange: (status: boolean) => void;
    disabledTime?: () => Array<number>;
}
interface State {
    visible: boolean;
}
declare class TimeInput extends PureComponent<Props, State> {
    inputEle: RefObject<Input>;
    constructor(props: any);
    handleChange: (e: any) => void;
    getDisabled: () => number[];
    computeTagNumber: (max: number, step: number) => {
        value: string;
        disabled: boolean;
    }[];
    onFocus: () => void;
    tagOnClick: (time: any) => void;
    onVisibleChange: (visible: any) => void;
    onPressEnter: (e: any) => void;
    render(): JSX.Element;
}
export default TimeInput;
