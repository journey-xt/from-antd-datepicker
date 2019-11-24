import React, { PureComponent } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import { memoize } from "lodash";
import TimeInput from "./component/TimeInput";
// import { TimeFormat } from "./index.d";
import { TIMEFORMAT, HOUR, MINUTE, SEC, HMS } from "../constant";
import { matchTimeFormat, fillTen, transformMoment } from "../utils";

const Warp = styled.div`
  padding: 5px 0;
`;

interface Props {
  format: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  value?: string | number | Moment | Date;
  timePickerOnOpenChange: (status: boolean) => void;
  datePickerOnOpenChange: (status: boolean) => void;
  timeOnChange: (time) => void;
  disabledHours?: () => Array<number>;
  disabledMinutes?: (hour: number) => Array<number>;
}

interface State {
  value: Moment;
}

class TimePicker extends PureComponent<Props, State> {
  static defaultProps = {
    hourStep: 1,
    minuteStep: 5,
    secondStep: 10,
    format: HMS
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  static getDerivedStateFromProps(props) {
    const { value } = props;

    if (value) {
      return { value: transformMoment(value) };
    }
    return { value: undefined };
  }

  // 根据format渲染文字
  formatRender = format => {
    const font = TIMEFORMAT.find(item => item.format === format);
    if (font) {
      return font.des;
    }
    return "-";
  };

  // 根据 format获得时间间隔 最大值
  formatStep = format => {
    const {
      hourStep = 1,
      minuteStep = 5,
      secondStep = 10,
      disabledHours,
      disabledMinutes
    } = this.props;

    const { value } = this.state;

    const hour = value.hour();
    const minute = value.minute();
    const second = value.second();

    switch (format) {
      case MINUTE: // 为分钟的input框的值
        return {
          step: minuteStep,
          max: 60,
          value: fillTen(minute),
          disabledTime: disabledMinutes,
          hour,
          minute
        };
      case SEC: // 为秒的input框的值
        return {
          step: secondStep,
          max: 60,
          value: fillTen(second),
          disabledTime: disabledMinutes,
          hour,
          minute
        };
      case HOUR: // 为小时的input框的值
      default:
        // 默认为  小时
        return {
          step: hourStep,
          max: 24,
          value: fillTen(hour),
          disabledTime: disabledHours,
          hour,
          minute
        };
    }
  };

  /* 单一一项 数值变化
    @params
    timeStr:string
    format:string */
  handleOnChange = (timeStr: string, format) => {
    const { value } = this.state;
    const newValue = this.timeChangeSetTime(format, value, timeStr);
    const { timeOnChange } = this.props;
    if (timeOnChange) {
      timeOnChange(newValue);
    } else {
      this.setState({ value: newValue });
    }
  };

  // 设置时间 返回时间对象
  timeChangeSetTime = (format, time, timeStr) => {
    switch (format) {
      case HOUR:
        return time.hour(timeStr);
      case MINUTE:
        return time.minute(timeStr);
      case SEC:
        return time.second(timeStr);
      default:
        return time;
    }
  };

  // 返回分隔符号
  splitSymbol = memoize(format => {
    const match = matchTimeFormat(format);
    if (match && Array.isArray(match)) {
      return match[2];
    }
    return false;
  });

  render() {
    const {
      format,
      timePickerOnOpenChange,
      datePickerOnOpenChange,
      value
    } = this.props;

    const splitSymbol = this.splitSymbol(format);

    const splitFormat = splitSymbol ? format.split(splitSymbol) : [];

    return (
      <Warp>
        {splitFormat.map(item => (
          <span key={item}>
            <TimeInput
              format={item}
              {...this.formatStep(item)}
              onChange={this.handleOnChange}
              timePickerOnOpenChange={timePickerOnOpenChange}
              datePickerOnOpenChange={datePickerOnOpenChange}
            />
            {this.formatRender(item)}
          </span>
        ))}
      </Warp>
    );
  }
}

export default TimePicker;
