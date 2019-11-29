import React, { PureComponent, RefObject } from "react";
import styled from "styled-components";
import { Input, Popover } from "antd";
import PopoverRender from "./PopoverRender";
import { HOUR, MINUTE, SEC } from "../../constant";
import { fillTen } from "../../utils";

const InputWarp = styled.div`
  display: inline-block;
  min-height: 38px;
  width: 50px;
  & .ant-input {
    padding: 4px 16px;
  }
`;

const PackPopover = styled(Popover)``;

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

class TimeInput extends PureComponent<Props, State> {
  inputEle: RefObject<Input>;

  constructor(props) {
    super(props);

    this.inputEle = React.createRef<Input>();
    this.state = {
      visible: false,
    };
  }

  // 输入框变化事件
  handleChange = e => {
    const { max } = this.props;
    const newValue = e.target.value;
    if (Number.isNaN(newValue) || Number(newValue) > max) {
      return;
    }
    const disableArray = this.getDisabled();
    const isDisable = disableArray.some(item => item === Number(newValue));
    if (isDisable) {
      return;
    }

    const { onChange, format } = this.props;

    if (onChange) {
      onChange(newValue || "0", format);
    }
  };

  // 获取禁止选择的时间段
  getDisabled = () => {
    const { disabledTime, hour, minute, format } = this.props;
    if (disabledTime) {
      return disabledTime();
    }
    return [];
  };

  // 根据最大值和间隔 计算数值
  computeTagNumber = (
    max: number,
    step: number
  ): Array<{ value: string; disabled: boolean }> => {
    const disableArray = this.getDisabled();
    const array: Array<{ value: string; disabled: boolean }> = [];
    let i = 0;
    while (i < max) {
      /* eslint-disable no-loop-func */
      array.push({
        value: fillTen(i),
        disabled: disableArray.some(item => i === item),
      });
      /* eslint-enable no-loop-func */
      i += step;
    }
    return array;
  };

  // 获得焦点事件
  onFocus = () => {
    if (this.inputEle && this.inputEle.current) {
      this.inputEle.current.input.select();
    }
  };

  // Tag 点击事件
  tagOnClick = time => {
    const { onChange, format } = this.props;
    if (onChange) {
      onChange(time || "00", format);
    }
    this.onFocus();
  };

  // Popover 显示隐藏回调
  onVisibleChange = visible => {
    const { timePickerOnOpenChange } = this.props;
    if (timePickerOnOpenChange) {
      timePickerOnOpenChange(visible);
    }
    this.setState({ visible });
  };

  // Input焦点状态按下 回车键 回调
  onPressEnter = e => {
    const { timePickerOnOpenChange, datePickerOnOpenChange } = this.props;
    if (timePickerOnOpenChange) {
      timePickerOnOpenChange(false);
    }
    if (datePickerOnOpenChange) {
      datePickerOnOpenChange(false);
    }
  };

  render() {
    const { value, format, max, step, ...reset } = this.props;
    const { visible } = this.state;

    const rownum = this.computeTagNumber(max, step);

    return (
      <PackPopover
        trigger="click"
        mouseEnterDelay={50}
        mouseLeaveDelay={0}
        visible={visible}
        getPopupContainer={triggerNode => triggerNode}
        autoAdjustOverflow
        onVisibleChange={this.onVisibleChange}
        overlayStyle={{ padding: "12px 4px" }}
        content={
          <PopoverRender
            {...reset}
            value={value}
            rownum={rownum}
            onChange={this.tagOnClick}
          />
        }
        placement={format === "HH" ? "topLeft" : "top"}
      >
        <InputWarp>
          <Input
            ref={this.inputEle}
            value={value}
            onChange={this.handleChange}
            onFocus={this.onFocus}
            onPressEnter={this.onPressEnter}
          />
        </InputWarp>
      </PackPopover>
    );
  }
}

export default TimeInput;
