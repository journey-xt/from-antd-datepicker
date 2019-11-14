import React, { PureComponent } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
// import { transformMoment, transformTimeStamp } from "../utils";

// 声明文件
import { Moment } from "moment/moment.d";
import { PickerValue } from "./typeing";
import { ValueType, ValueStatus } from "./enum";

moment.locale("zh-cn");

const PackDataPick = styled(DatePicker)`
  width: 100%;
`;

// 声明组件Props类型
export interface SingleDatePickerProps {
  format?: string | string[];
  selectTodayAfter?: boolean;
  showTime?: boolean;
  valueStatus?: ValueStatus;
  disabledDate?: (
    currentDate: Moment | undefined,
    valueStatus?: ValueStatus
  ) => boolean;
  valueType?: ValueType;
  onChange?: (value?: PickerValue, ValueStatus?) => void;
  defaultPickerValue?: Moment;
  showToday?: boolean;
  value?: string | number | Moment | Date;
}

// 声明组件State类型
type State = {
  currentDate: Moment;
  value?: string | number | Moment | Date;
};

class SingleDatePicker extends PureComponent<SingleDatePickerProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(), // 当前时间
      value: props.value // 内部维护 时间组件的值得
    };
  }

  static getDerivedStateFromProps(props) {
    const { value } = props;
    if (value) {
      return { value };
    }
    return { value: undefined };
  }

  static defaultProps = {
    valueType: ValueType.TimeStamp,
    format: "YYYY-MM-DD",
    valueStatus: ValueStatus.Start,
    selectTodayAfter: true
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
        return currentDate.isBefore(compareDate, "day");
      }
      return false;
    }
    return false;
  };

  // 通过传入的 值 转成moment对象传递给组件
  transformValue = date => {
    const transformDate = moment(date);
    if (date && transformDate.isValid()) {
      return transformDate;
    }
    return undefined;
  };

  // 根据传递回来的 moment对象 取得 开始时间戳 和结束时间戳
  timeStampBack = (date: Moment | null, valueStatus?: ValueStatus) => {
    const { valueType } = this.props;
    if (valueType === ValueType.TimeStamp) {
      switch (valueStatus) {
        case ValueStatus.Start:
          return date ? date.startOf("day").valueOf() : undefined;
        case ValueStatus.End:
          return date ? date.endOf("day").valueOf() : undefined;
        default:
          return date ? date.valueOf() : undefined;
      }
    }
    return undefined;
  };

  // 时间变化回调
  onChange = (date: Moment | null, dateString?: string) => {
    const { valueType, valueStatus, onChange } = this.props;
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

  // 添加额外的的页脚render
  renderExtraFooter = () => <div>9999</div>;

  render() {
    const { value } = this.state;
    const { defaultPickerValue, showToday } = this.props;
    return (
      <PackDataPick
        value={this.transformValue(value)}
        onChange={this.onChange}
        disabledDate={this.disabledDate}
        defaultPickerValue={defaultPickerValue}
        showToday={showToday}
        //  renderExtraFooter={this.renderExtraFooter}
      />
    );
  }
}

export default SingleDatePicker;
