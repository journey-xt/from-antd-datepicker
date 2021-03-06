import React, { PureComponent } from "react";
import styled from "styled-components";
import { DatePicker, Button } from "antd";
import moment from "moment";
import TimePicker from "../TimePicker";
import { matchTimeFormat, transformMoment, createArray } from "../utils";

// 声明文件
import { Moment } from "moment/moment.d";
import { PickerValue } from "./typeing";
import { ValueType, ValueStatus } from "./enum";

const PackDataPick = styled(DatePicker)`
  width: 100%;
`;

const RenderTimeWarp = styled.div`
  padding-right: 50px;
  position: relative;
  .ant-btn {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -12px;
  }
`;

// 声明组件Props类型
export interface SingleDatePickerProps {
  format?: string;
  disabled?: boolean;
  allowClear?: boolean;
  selectTodayAfter?: boolean;
  showTime?: boolean;
  getCalendarContainer?: (triggerNode: HTMLElement) => HTMLElement;
  valueStatus?: ValueStatus; // 在联结选择器中 使用
  defaultPickerValue?: Moment;
  showToday?: boolean;
  valueType?: "timeStamp" | "timeString" | "moment";
  value?: string | number | Moment | Date;
  onChange?: (value: PickerValue | null, ValueStatus?) => void;
  placeholder?: string;
  disabledDate?: (
    currentDate: Moment | undefined,
    valueStatus?: ValueStatus
  ) => boolean;
  disabledHours?: (
    currentDate: Moment,
    valueStatus?: ValueStatus
  ) => Array<number>;
  disabledMinutes?: (
    currentDate: Moment,
    valueStatus?: ValueStatus
  ) => Array<number>;
  disabledSeconds?: (
    currentDate: Moment,
    valueStatus?: ValueStatus
  ) => Array<number>;
}

// 声明组件State类型
type State = {
  currentDate: Moment;
  dateLayer: boolean;
  timeFormat: string;
  value?: string | number | Moment | Date;
};

class SingleDatePicker extends PureComponent<SingleDatePickerProps, State> {
  timeLayer: boolean;

  constructor(props) {
    super(props);
    this.timeLayer = false;
    this.state = {
      currentDate: moment(), // 当前时间
      value: props.value, // 内部维护 时间组件的值
      dateLayer: false,
      timeFormat: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { value, format } = props;
    const { stateValue } = state;

    const timeFormatMatch = matchTimeFormat(format);

    if (value) {
      return {
        value,
        timeFormat: Array.isArray(timeFormatMatch) ? timeFormatMatch[0] : ""
      };
    }
    return {
      value: stateValue || undefined,
      timeFormat: Array.isArray(timeFormatMatch) ? timeFormatMatch[0] : ""
    };
  }

  static defaultProps = {
    valueType: ValueType.TimeStamp,
    format: "YYYY-MM-DD"
  };

  // 不可选择时间回调
  disabledDate = (currentDate: Moment | undefined) => {
    const { disabledDate, selectTodayAfter, valueStatus } = this.props;
    // 传递外层API 禁用日期
    if (disabledDate && currentDate) {
      return disabledDate(currentDate, valueStatus);
    }
    if (selectTodayAfter) {
      const { currentDate: compareDate } = this.state;
      if (currentDate) {
        return currentDate.isBefore(compareDate, "second");
      }
      return false;
    }
    return false;
  };

  // 根据传递回来的 moment对象 取得 开始时间戳 和结束时间戳
  timeStampBack = (date: Moment | null, valueStatus?: ValueStatus) => {
    const { valueType, format } = this.props;
    const { timeFormat } = this.state;
    switch (valueType) {
      case ValueType.TimeStamp:
        if (timeFormat) {
          return date ? date.valueOf() : null;
        }
        switch (valueStatus) {
          case ValueStatus.Start:
            return date ? date.startOf("day").valueOf() : null;
          case ValueStatus.End:
            return date ? date.endOf("day").valueOf() : null;
          default:
            return date ? date.valueOf() : null;
        }
      case ValueType.TimeString:
        return date ? date.format(format) : null;
      case ValueType.Moment:
      default:
        return date;
    }
  };

  // 时间变化回调
  onChange = (date: Moment | null, dateString: string) => {
    const { valueType, valueStatus, onChange } = this.props;

    console.log(date);

    const { timeFormat } = this.state;
    // 解决 date 组件 隐藏
    if (timeFormat) {
      this.setState({ dateLayer: true });
    }
    if (onChange) {
      switch (valueType) {
        case ValueType.TimeStamp:
          return onChange(this.timeStampBack(date, valueStatus), valueStatus);
        case ValueType.TimeString:
          return onChange(dateString, valueStatus);
        case ValueType.Moment:
        default:
          return onChange(date, valueStatus);
      }
    } else {
      this.setState({ value: date || undefined });
    }
  };

  // 禁用小时回调
  disabledHours = () => {
    const { disabledHours, valueStatus, selectTodayAfter } = this.props;
    const { currentDate, value } = this.state;
    if (disabledHours) {
      return disabledHours(currentDate, valueStatus);
    }

    if (selectTodayAfter) {
      // 被选中时间
      const selectDate = transformMoment(value);

      // 当前小时数
      const currentHour = currentDate.hour();

      // 如果有选中时间
      if (selectDate) {
        // 判断选中时间 是否 是当前时间  且是当日
        const isSameStartCurrent = selectDate.isSame(currentDate, "day");

        // 同为当日 不可选取 已过时间小时
        if (isSameStartCurrent) {
          return [...createArray(0, currentHour)];
        }

        return [];
      }

      return [...createArray(0, currentHour)];
    }

    return [];
  };

  // 禁用分钟回调
  disabledMinutes = () => {
    const { disabledMinutes, valueStatus, selectTodayAfter } = this.props;
    const { currentDate, value } = this.state;
    if (disabledMinutes) {
      return disabledMinutes(currentDate, valueStatus);
    }

    if (selectTodayAfter) {
      // 被选中时间
      const selectDate = transformMoment(value);

      // 当前分钟
      const currentMinute = currentDate.minute();

      // 如果有选中时间
      if (selectDate) {
        // 判断选中时间 是否 是当前时间  且是当日
        const isSameStartCurrent = selectDate.isSame(currentDate, "hour");

        // 同为当日 不可选取 已过时间小时
        if (isSameStartCurrent) {
          return [...createArray(0, currentMinute)];
        }

        return [];
      }

      return [...createArray(0, currentMinute)];
    }

    return [];
  };

  // 禁用秒回调
  disabledSeconds = () => {
    const { disabledSeconds, valueStatus, selectTodayAfter } = this.props;
    const { currentDate, value } = this.state;
    if (disabledSeconds) {
      return disabledSeconds(currentDate, valueStatus);
    }

    if (selectTodayAfter) {
      // 被选中时间
      const selectDate = transformMoment(value);

      // 当前 秒
      const currentSecond = currentDate.second();

      // 如果有选中时间
      if (selectDate) {
        // 判断选中时间 是否 是当前时间  且是当日
        const isSameStartCurrent = selectDate.isSame(currentDate, "minute");

        // 同为当日 不可选取 已过时间小时
        if (isSameStartCurrent) {
          return [...createArray(0, currentSecond)];
        }

        return [];
      }

      return [...createArray(0, currentSecond)];
    }
    return [];
  };

  // 添加额外的的页脚render
  // 需要选择 时分秒生成module
  renderExtraFooter = () => {
    const { value, defaultPickerValue } = this.props;

    const { timeFormat } = this.state;

    if (timeFormat) {
      const { currentDate } = this.state;
      return (
        <RenderTimeWarp>
          <TimePicker
            format={timeFormat}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            timePickerOnOpenChange={this.timePickOnOpenChange}
            datePickerOnOpenChange={this.onOpenChange}
            timeOnChange={this.timeOnChange}
            value={value || defaultPickerValue || currentDate}
          />
          <Button size="small" type="primary" onClick={this.pickerConfirm}>
            确定
          </Button>
        </RenderTimeWarp>
      );
    }
    return null;
  };

  // 时间组件 数值变化回调
  timeOnChange = time => {
    const { format } = this.props;
    this.onChange(time, time.format(format));
  };

  // 组件确认按钮回调
  pickerConfirm = () => {
    this.setState({ dateLayer: false });
  };

  // 文档写的是 显示面板回调  但是貌似是 获取焦点和失去焦点回调
  onOpenChange = (status: boolean) => {
    console.log(status);

    if (this.timeLayer) {
      return;
    }

    const { value } = this.state;

    if (!value && status) {
      this.setState({ dateLayer: status, currentDate: moment() });
    } else {
      this.setState({ dateLayer: status });
    }
  };

  // 时间组件 面板回调
  timePickOnOpenChange = status => {
    this.timeLayer = status;
  };

  render() {
    const { value, dateLayer, currentDate } = this.state;
    const {
      defaultPickerValue,
      showToday,
      format,
      placeholder,
      getCalendarContainer,
      disabled,
      allowClear
    } = this.props;

    const extendsPlaceholder = placeholder ? { placeholder } : {};

    return (
      <PackDataPick
        format={format}
        {...extendsPlaceholder}
        value={transformMoment(value)}
        getCalendarContainer={getCalendarContainer}
        onOpenChange={this.onOpenChange}
        disabled={disabled}
        allowClear={allowClear}
        onChange={this.onChange}
        // @ts-ignore
        disabledDate={this.disabledDate}
        defaultPickerValue={defaultPickerValue || currentDate}
        showToday={showToday}
        renderExtraFooter={this.renderExtraFooter}
        open={dateLayer}
      />
    );
  }
}

export default SingleDatePicker;
