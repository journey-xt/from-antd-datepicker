import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import moment from "moment";
// 声明文件
import { Moment } from "moment/moment.d";
import { PickerValue } from "../SingleDatePicker/typeing";
import { ValueType, ValueStatus } from "../SingleDatePicker/enum";
import { RangePickerValue } from "./typeing";
// 组件引用
import SingleDatePicker from "../SingleDatePicker";

import { SENIORPERSON } from "../constant";

const LayoutCol = styled(Col)`
  position: relative;
`;

const LayoutDiv = styled.div`
  position: absolute;
  left: 50%;
`;

const RelationSpan = styled.div`
  position: relative;
  right: 50%;
`;

// 声明组件Props类型
type Props = {
  disabledDate?: (
    currentDate: Moment | undefined,
    valueStatus?: ValueStatus
  ) => boolean;
  selectTodayAfter?: boolean;
  valueStatus?: ValueStatus;
  format?: string;
  valueType?: ValueType;
  onChange?: (value: RangePickerValue) => void;
  showToday?: boolean;
};

// 声明组件State类型
type State = {
  value: RangePickerValue;
  currentDate: Moment;
};

class RangePicker extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(),
      value: { [ValueStatus.Start]: undefined, [ValueStatus.End]: undefined }, // 内部维护 时间组件的值
    };
  }

  static defaultProps = {
    valueType: ValueType.TimeStamp,
    format: "YYYY-MM-DD",
    valueStatus: ValueStatus.Start,
    showToday: true,
  };

  static getDerivedStateFromProps(props) {
    const { value } = props;

    if (value && (value[ValueStatus.Start] || value[ValueStatus.End])) {
      return {
        value: {
          [ValueStatus.Start]: value[ValueStatus.Start],
          [ValueStatus.End]: value[ValueStatus.End],
        },
      };
    }
    return {
      value: { [ValueStatus.Start]: undefined, [ValueStatus.End]: undefined },
    };
  }

  // 不可选择时间回调
  disabledDate = (
    currentDate: Moment | undefined,
    valueStatus?: ValueStatus
  ) => {
    const { disabledDate, selectTodayAfter } = this.props;
    // 上层 不可选择时间段 回调
    if (disabledDate) {
      return disabledDate(currentDate, valueStatus);
    }

    const { value, currentDate: compareDate } = this.state;
    const startTime = value[ValueStatus.Start];
    const endTime = value[ValueStatus.End];

    switch (valueStatus) {
      case ValueStatus.Start:
        if (selectTodayAfter) {
          if (currentDate && !endTime) {
            return currentDate.isBefore(compareDate);
          }
          if (currentDate && endTime) {
            return (
              currentDate.isBefore(compareDate) || currentDate.isAfter(endTime)
            );
          }
          return false;
        }
        return false;
      case ValueStatus.End:
        if (selectTodayAfter) {
          if (currentDate && !startTime) {
            return currentDate.isBefore(compareDate);
          }
          if (currentDate && startTime) {
            return currentDate.isBefore(startTime);
          }
          return false;
        }
        return false;
      default:
    }
    return true;
  };

  //  时间变化回调
  onChange = (value?: PickerValue, valueStatus?: ValueStatus) => {
    const { onChange } = this.props;
    const { value: stateValue } = this.state;
    if (onChange) {
      onChange({
        ...stateValue,
        ...(valueStatus ? { [valueStatus]: value } : {}),
      });
    } else {
      this.setState({
        value: {
          ...stateValue,
          ...(valueStatus ? { [valueStatus]: value } : {}),
        },
      });
    }
  };

  // 开始时间 禁止 选择的小时和分钟  如果有 selectedHour 代表是 选中的分钟
  startDisabledTime = (selectedHour?: number): Array<number> => {
    const { value } = this.state;
    const { end, start } = value;
    if (!end) {
      return !selectedHour ? [...SENIORPERSON] : [];
    }
    const hour = moment(end).hour();
    // 代表是 小时
    const endTimeStamp = (end ? moment(end) : moment(end)) // this.timeDefaultPickerValue("endTime")
      .startOf("day")
      .valueOf();
    const startTimeStamp = moment(start)
      .startOf("day")
      .valueOf();
    if (!selectedHour) {
      return [...this.createArray(hour + 1, 24), ...SENIORPERSON];
    }
    const minute = moment(end).minute();
    if (selectedHour === hour && endTimeStamp === startTimeStamp) {
      return [...this.createArray(minute + 1, 60)];
    }
    return [];
  };

  // 禁用小时
  disabledHours = (valueStatus?: ValueStatus) => {
    const { value } = this.state;
    const { end, start } = value;
    const { selectTodayAfter } = this.props;

    switch (valueStatus) {
      case ValueStatus.Start:
        const startHour = moment(start).hour();
        if (!end) {
          return selectTodayAfter ? [...this.createArray(1, startHour)] : [];
        }
        const hour = moment(end).hour();
        return selectTodayAfter ? [...this.createArray(startHour, hour)] : [];
      case ValueStatus.End:
      default:
        return [];
    }
  };

  // 生成 对应数组
  createArray = (start: number, end: number): number[] => {
    const array: number[] = [];
    const len = end;
    for (let i = start; i < len; i++) {
      array.push(i);
    }
    return array;
  };

  render() {
    const { value } = this.state;
    const startTime = value[ValueStatus.Start];
    const endTime = value[ValueStatus.End];
    const { showToday, format, selectTodayAfter } = this.props;
    return (
      <Row gutter={24}>
        <LayoutCol span={12}>
          <SingleDatePicker
            format={format}
            value={startTime}
            valueStatus={ValueStatus.Start}
            disabledDate={this.disabledDate}
            disabledHours={this.disabledHours}
            selectTodayAfter={selectTodayAfter}
            onChange={this.onChange}
            showToday={showToday}
            valueType={ValueType.TimeStamp}
            defaultPickerValue={startTime ? moment(startTime) : undefined}
          />
        </LayoutCol>
        <LayoutDiv>
          <RelationSpan>~</RelationSpan>
        </LayoutDiv>
        <Col span={12}>
          <SingleDatePicker
            format={format}
            value={endTime}
            selectTodayAfter={selectTodayAfter}
            valueStatus={ValueStatus.End}
            disabledDate={this.disabledDate}
            showToday={showToday}
            onChange={this.onChange}
            valueType={ValueType.TimeStamp}
            defaultPickerValue={startTime ? moment(startTime) : undefined}
          />
        </Col>
      </Row>
    );
  }
}

export default RangePicker;
