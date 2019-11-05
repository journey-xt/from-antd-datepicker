import React, { Component } from 'react';
import styled from 'styled-components';
import { DatePicker, Row, Col } from 'antd';
import moment from 'moment';

// 声明文件
import { Moment } from 'moment/moment.d';
import { ValueType, PickerValue, ValueStatus } from './SingleDatePicker.d';

const PackDataPick = styled(DatePicker)`
  width: 100%;
`;

// 声明组件Props类型
type Props = {
  format?: string | string[];
  selectTodayAfter?: boolean;
  showTime?: boolean;
  valueStatus?: ValueStatus;
  disabledDate?: (currentDate: Moment) => boolean;
  valueType?: ValueType;
  onChange?: (value: PickerValue) => void;
};

// 声明组件State类型
type State = {
  currentDate: Moment;
  value?: string | number | Moment | Date;
};

class TimePicker extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(), // 当前时间
      value: moment(), // 内部维护 时间组件的值得
    };
  }

  static defaultProps = {
    valueType: ValueType.TimeStamp,
    format: 'YYYY-MM-DD',
    valueStatus: ValueStatus.Start,
    selectTodayAfter: true,
  };

  // 不可选择时间回调
  disabledDate = (currentDate?: Moment | undefined) => {
    const { disabledDate, selectTodayAfter } = this.props;
    // 传递外层API 禁用日期
    if (disabledDate && currentDate) {
      return disabledDate(currentDate);
    }
    if (selectTodayAfter) {
      const { currentDate: compareDate } = this.state;
      if (currentDate) {
        return currentDate.isBefore(compareDate, 'day');
      }
      return false;
    }
    return false;
  };

  // 通过传入的 值 转成moment对象传递给组件
  transformValue = date => {
    const transformDate = moment(date);
    if (transformDate.isValid()) {
      return moment(date);
    }
    // 返回 当前时间
    return moment();
  };

  // 时间变化回调
  onChange = (date: Moment, dateString: string) => {
    const { valueType, valueStatus, onChange } = this.props;
    this.setState({ value: date });
    if (onChange) {
      switch (valueType) {
        case ValueType.TimeStamp:
          return date;
        case ValueType.TimeString:
          return dateString;
        case ValueType.Moment:
        default:
          return date;
      }
    }
  };

  render() {
    const { value } = this.state;
    return (
      <PackDataPick
        value={this.transformValue(value)}
        onChange={this.onChange}
        disabledDate={this.disabledDate}
      />
    );
  }
}

export default TimePicker;
