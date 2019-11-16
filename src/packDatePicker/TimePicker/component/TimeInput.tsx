/* @flow */
import React, { PureComponent, RefObject } from "react";

import styled from "styled-components";

import { Input, Popover } from "antd";

import "moment/locale/zh-cn";

import PopoverRender from "./PopoverRender";

import { formatTimeShow } from "./tools";

const InputWarp = styled.div`
  display: inline-block;
  width: 50px;
  & .ant-input {
    padding: 4px 16px;
  }
`;

interface Props {
  title: string | React.ReactNode;
  format: string;
  max: number;
  step: number;
  hour: number;
  minute: number;
  // onChange: Function;
  // datePickerOpenChange: Function;
  // timePickOnOpenChange: Function;
  disabledTime: Function;
}

interface State {
  visible: boolean;
}

class TimeInput extends PureComponent<Props, State> {
  PopoverTag: boolean;

  inputEle: RefObject<Input>;

  constructor(props) {
    super(props);
    this.PopoverTag = false;
    this.inputEle = React.createRef<Input>();
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    console.log(this.inputEle);
  }

  // 输入框变化事件
  handleChange = e => {
    // const { max } = this.props;
    // const newValue = e.target.value;
    // const valueLen = newValue.length;
    // if (Number.isNaN(newValue) || Number(newValue) > max || valueLen > 2) {
    //   return;
    // }
    // const disableArray = this.getDisabled();
    // const isDisable = disableArray.some(item => item === Number(newValue));
    // if (isDisable) {
    //   this.setState({ value: e.target.value });
    // } else {
    //   this.setState({ value: e.target.value }, () => {
    //     const { value } = this.state;
    //     const { onChange, format } = this.props;
    //     if (onChange) {
    //       onChange(value || '0', format);
    //     }
    //   });
    // }
  };

  // 获取禁止选择的时间段
  getDisabled = () => {
    const { disabledTime, hour, minute } = this.props;
    if (disabledTime && typeof disabledTime === "function") {
      return disabledTime(hour || hour === 0 ? hour : minute, minute);
    }
    return [];
  };

  // 根据最大值和间隔 计算数值
  computeTagNumber = (max, step) => {
    const disableArray = this.getDisabled();
    const array: Array<{ value: string; disabled: boolean }> = [];
    let i = 0;
    while (i < max) {
      /* eslint-disable no-loop-func */
      array.push({
        value: formatTimeShow(i),
        disabled: disableArray.some(item => i === item)
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
    // this.setState({ value: time }, () => {
    //   //  const { value } = this.state;
    //   const { onChange, format } = this.props;
    //   if (onChange) {
    //     //  onChange(value || '00', format);
    //   }
    //   this.onFocus();
    // });
  };

  // Popover 显示隐藏回调
  onVisibleChange = visible => {
    //  const { timePickOnOpenChange } = this.props;
    // if (timePickOnOpenChange) {
    //   timePickOnOpenChange(visible);
    // }
    //    this.setState({ visible });
  };

  // Input焦点状态按下 回车键 回调
  onPressEnter = e => {
    //  const { timePickOnOpenChange, datePickerOpenChange } = this.props;
    // if (timePickOnOpenChange) {
    //   timePickOnOpenChange(false);
    // }
    // if (datePickerOpenChange) {
    //   datePickerOpenChange(false);
    // }
  };

  render() {
    const { title, format, max, step, ...reset } = this.props;
    const { visible } = this.state;

    const rownum = this.computeTagNumber(max, step);

    return (
      <Popover
        trigger="click"
        //   title={title}
        //   visible={visible}
        onVisibleChange={this.onVisibleChange}
        overlayStyle={{ zIndex: 1050, padding: "12px 4px" }}
        content={
          visible ? (
            <PopoverRender
              {...reset}
              format={format}
              // value={value}
              rownum={rownum}
              onChange={this.tagOnClick}
            />
          ) : null
        }
        placement={format === "HH" ? "topLeft" : "top"}
      >
        <InputWarp>
          <Input
            ref={this.inputEle}
            //   value={value}
            onChange={this.handleChange}
            onFocus={this.onFocus}
            onPressEnter={this.onPressEnter}
          />
        </InputWarp>
      </Popover>
    );
  }
}

export default TimeInput;
