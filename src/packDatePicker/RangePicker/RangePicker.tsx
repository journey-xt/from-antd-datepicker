import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import moment from "moment";
// 声明文件
import { Moment } from "moment/moment.d";
import { PickerValue } from "../SingleDatePicker/typeing";
import { ValueType, ValueStatus } from "../SingleDatePicker/enum";
import { RangePickerValue } from "./typeing";
import { transformMoment } from "../utils";
// 组件引用
import SingleDatePicker from "../SingleDatePicker";

import { SENIORPERSON } from "../constant";

import "moment/locale/zh-cn";

moment.locale("en");

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
      value: { [ValueStatus.Start]: undefined, [ValueStatus.End]: undefined } // 内部维护 时间组件的值
    };
  }

  static defaultProps = {
    valueType: ValueType.TimeStamp,
    format: "YYYY-MM-DD",
    valueStatus: ValueStatus.Start,
    showToday: true
  };

  static getDerivedStateFromProps(props) {
    const { value } = props;

    if (value && (value[ValueStatus.Start] || value[ValueStatus.End])) {
      return {
        value: {
          [ValueStatus.Start]: value[ValueStatus.Start],
          [ValueStatus.End]: value[ValueStatus.End]
        }
      };
    }
    return {
      value: { [ValueStatus.Start]: undefined, [ValueStatus.End]: undefined }
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
        ...(valueStatus ? { [valueStatus]: value } : {})
      });
    } else {
      this.setState({
        value: {
          ...stateValue,
          ...(valueStatus ? { [valueStatus]: value } : {})
        }
      });
    }
  };

  // 禁用小时
  disabledHours = (currentDate, valueStatus?: ValueStatus) => {
    const { value } = this.state;
    const { end, start } = value;
    const { selectTodayAfter } = this.props;

    switch (valueStatus) {
      case ValueStatus.Start:
        const startHour = start ? moment(start).hour() : currentDate.hour();
        if (!end) {
          return selectTodayAfter ? [...this.createArray(0, startHour)] : [];
        }
        const endMonet = moment(end);
        const statusStartendHour = endMonet.hour();
        const startIsEnd = (start ? moment(start) : currentDate).isSame(
          endMonet,
          "day"
        );
        return selectTodayAfter
          ? [
              ...this.createArray(0, startHour),
              ...(startIsEnd
                ? this.createArray(statusStartendHour + 1, 24)
                : [])
            ]
          : [
              ...(startIsEnd
                ? this.createArray(statusStartendHour + 1, 24)
                : [])
            ];
      case ValueStatus.End:
        const currentHour = currentDate.hour();
        if (!start) {
          return selectTodayAfter ? [...this.createArray(0, currentHour)] : [];
        }
        const startMonet = moment(start);
        const statusEndStartHour = startMonet.hour();
        const endIsStart = moment(end).isSame(startMonet, "day");
        return selectTodayAfter
          ? [...(endIsStart ? this.createArray(0, statusEndStartHour) : [])]
          : [...(endIsStart ? this.createArray(0, statusEndStartHour) : [])];
      default:
        return [];
    }
  };

  // 禁用分钟
  disabledMinutes = (
    currentDate: Moment,
    hour: number,
    valueStatus?: ValueStatus
  ) => {
    const { value } = this.state;
    const { end, start } = value;
    const { selectTodayAfter } = this.props;

    switch (valueStatus) {
      case ValueStatus.Start:
        const startHour = start ? moment(start).hour() : currentDate.hour();
        if (!end) {
          return selectTodayAfter ? [...this.createArray(0, startHour)] : [];
        }
        const endMonet = moment(end);
        const statusStartendHour = endMonet.hour();
        const startIsEnd = (start ? moment(start) : currentDate).isSame(
          endMonet,
          "day"
        );
        return selectTodayAfter
          ? [
              ...this.createArray(0, startHour),
              ...(startIsEnd
                ? this.createArray(statusStartendHour + 1, 24)
                : [])
            ]
          : [
              ...(startIsEnd
                ? this.createArray(statusStartendHour + 1, 24)
                : [])
            ];
      case ValueStatus.End:
        const currentHour = currentDate.hour();
        if (!start) {
          return selectTodayAfter ? [...this.createArray(0, currentHour)] : [];
        }
        const startMonet = moment(start);
        const statusEndStartHour = startMonet.hour();
        const endIsStart = moment(end).isSame(startMonet, "day");
        return selectTodayAfter
          ? [...(endIsStart ? this.createArray(0, statusEndStartHour) : [])]
          : [...(endIsStart ? this.createArray(0, statusEndStartHour) : [])];
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

  // 结束时间 默认面板日期
  timeDefaultPickerValue = type => {
    console.log(1111);
    const { value } = this.state;
    if (value[type]) {
      return moment(value[type]);
    }
    return moment(new Date());
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
            showToday={showToday}
            valueType={ValueType.Moment}
            valueStatus={ValueStatus.Start}
            disabledDate={this.disabledDate}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            selectTodayAfter={selectTodayAfter}
            onChange={this.onChange}
            defaultPickerValue={endTime ? moment(endTime) : undefined}
          />
        </LayoutCol>
        <LayoutDiv>
          <RelationSpan>~</RelationSpan>
        </LayoutDiv>
        <Col span={12}>
          <SingleDatePicker
            format={format}
            value={endTime}
            showToday={showToday}
            valueType={ValueType.Moment}
            selectTodayAfter={selectTodayAfter}
            valueStatus={ValueStatus.End}
            disabledDate={this.disabledDate}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            onChange={this.onChange}
            defaultPickerValue={startTime ? moment(startTime) : undefined}
          />
        </Col>
      </Row>
    );
  }
}

export default RangePicker;
