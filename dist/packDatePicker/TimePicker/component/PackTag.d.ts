import { PureComponent } from "react";
interface ITag {
    value: string;
    disabled: boolean;
}
interface Props {
    onChange: (tag: string, checked: boolean) => void;
    tags: ITag;
    checked: boolean;
    children: string;
    disabled: boolean;
}
declare class PackTag extends PureComponent<Props> {
    constructor(props: any);
    handleOnChange: (checked: any) => void;
    render(): JSX.Element;
}
export default PackTag;
