import { PureComponent } from "react";
interface Props {
    onChange: (tag: any, checked: any) => void;
    rownum: Array<{
        value: string;
        disabled: boolean;
    }>;
    value: any;
}
interface State {
}
declare class PopoverRender extends PureComponent<Props, State> {
    constructor(props: any);
    handleOnChange: (tag: string, checked: boolean) => void;
    render(): JSX.Element;
}
export default PopoverRender;
