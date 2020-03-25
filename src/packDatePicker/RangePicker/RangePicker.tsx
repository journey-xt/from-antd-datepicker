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
  placeholder?: string[];
  disabledDate?: (
    currentDate: Moment | undefined,
    valueStatus?: ValueStatus
  ) => boolean;
  selectTodayAfter?: boolean;
  valueStatus?: ValueStatus;
  format?: string;
  valueType?: "timeStamp" | "timeString" | "moment";
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
  onChange = (value: PickerValue | null, valueStatus?: ValueStatus) => {
    const { onChange } = this.props;
    const { value: stateValue } = this.state;
    const { start, end } = stateValue;
    if (onChange) {
      switch (valueStatus) {
        case ValueStatus.Start:
          if (end && value) {
            onChange({
              [ValueStatus.Start]: moment(value).isAfter(end) ? end : value,
              [ValueStatus.End]: end,
            });
            return;
          }
          onChange({
            ...stateValue,
            ...(valueStatus ? { [valueStatus]: value || undefined } : {}),
          });
          break;
        case ValueStatus.End:
          if (start && value) {
            onChange({
              [ValueStatus.Start]: start,
              [ValueStatus.End]: moment(value).isBefore(start) ? start : value,
            });
            return;
          }
          onChange({
            ...stateValue,
            ...(valueStatus ? { [valueStatus]: value || undefined } : {}),
          });
          break;
        default:
          onChange({ ...stateValue });
      }
    } else {
      this.setState({
        value: {
          ...stateValue,
          ...(valueStatus ? { [valueStatus]: value } : {}),
        },
      });
    }
  };

  // 禁用小时
  disabledHours = (currentDate, valueStatus?: ValueStatus) => {
    const { value } = this.state;
    const { end, start } = value;
    const { selectTodayAfter } = this.props;

    const currentHour = currentDate.hour();

    switch (valueStatus) {
      case ValueStatus.Start:
        const isSameStartCurrent = (start ? moment(start) : currentDate).isSame(
          currentDate,
          "day"
        );
        if (!end) {
          return selectTodayAfter && isSameStartCurrent
            ? [...this.createArray(0, currentHour)]
            : [];
        }
        const endMonet = moment(end);
        const statusStartendHour = endMonet.hour();
        const startIsEnd = (start ? moment(start) : currentDate).isSame(
          endMonet,
          "day"
        );
        return [
          ...(selectTodayAfter ? this.createArray(0, currentHour) : []),
          ...(startIsEnd ? this.createArray(statusStartendHour + 1, 24) : []),
        ];

      case ValueStatus.End:
        const isSameEndCurrent = (end ? moment(end) : currentDate).isSame(
          currentDate,
          "day"
        );
        if (!start) {
          return selectTodayAfter && isSameEndCurrent
            ? [...this.createArray(0, currentHour)]
            : [];
        }
        const startMonet = moment(start);
        const statusEndStartHour = startMonet.hour();
        const endIsStart = (end ? moment(end) : currentDate).isSame(
          startMonet,
          "day"
        );

        return [
          ...(selectTodayAfter ? this.createArray(0, currentHour) : []),
          ...(endIsStart ? [...this.createArray(0, statusEndStartHour)] : []),
        ];

      default:
        return [];
    }
  };

  // 禁用分钟
  disabledMinutes = (currentDate: Moment, valueStatus?: ValueStatus) => {
    const { value } = this.state;
    const { end, start } = value;
    const { selectTodayAfter } = this.props;

    const currentMinute = currentDate.minute();

    switch (valueStatus) {
      case ValueStatus.Start:
        const isSameCurrenthour = (start ? moment(start) : currentDate).isSame(
          currentDate,
          "hour"
        );

        if (end) {
          const endMinute = moment(end).minute();
          const isSameEndHour = (start ? moment(start) : currentDate).isSame(
            end,
            "hour"
          );
          return [
            ...(selectTodayAfter && isSameCurrenthour
              ? this.createArray(0, currentMinute)
              : []),
            ...(isSameEndHour ? this.createArray(endMinute + 1, 60) : []),
          ];
        }
        return [
          ...(selectTodayAfter && isSameCurrenthour
            ? this.createArray(0, currentMinute)
            : []),
        ];
      case ValueStatus.End:
        const statusEndisSameCurrentHour = (end
          ? moment(end)
          : currentDate
        ).isSame(currentDate, "hour");

        if (start) {
          const isSameStartHour = (end ? moment(end) : currentDate).isSame(
            start,
            "hour"
          );
          const startMinute = moment(start).minute();
          return [
            ...(selectTodayAfter && statusEndisSameCurrentHour
              ? this.createArray(0, currentMinute)
              : []),
            ...(isSameStartHour ? this.createArray(0, startMinute) : []),
          ];
        }
        return [
          ...(selectTodayAfter && statusEndisSameCurrentHour
            ? this.createArray(0, currentMinute)
            : []),
        ];

      default:
        return [];
    }
  };

  // 禁用秒
  disabledSeconds = (currentDate: Moment, valueStatus?: ValueStatus) => {
    const { value } = this.state;
    const { end, start } = value;
    const { selectTodayAfter } = this.props;

    const currentMinute = currentDate.second();

    switch (valueStatus) {
      case ValueStatus.Start:
        const isSameCurrenthour = (start ? moment(start) : currentDate).isSame(
          currentDate,
          "minute"
        );

        if (end) {
          const endMinute = moment(end).second();
          const isSameEndHour = (start ? moment(start) : currentDate).isSame(
            end,
            "minute"
          );
          return [
            ...(selectTodayAfter && isSameCurrenthour
              ? this.createArray(0, currentMinute)
              : []),
            ...(isSameEndHour ? this.createArray(endMinute + 1, 60) : []),
          ];
        }
        return [
          ...(selectTodayAfter && isSameCurrenthour
            ? this.createArray(0, currentMinute)
            : []),
        ];
      case ValueStatus.End:
        const statusEndisSameCurrentHour = (end
          ? moment(end)
          : currentDate
        ).isSame(currentDate, "minute");

        if (start) {
          const isSameStartHour = (end ? moment(end) : currentDate).isSame(
            start,
            "minute"
          );
          const startMinute = moment(start).second();
          return [
            ...(selectTodayAfter && statusEndisSameCurrentHour
              ? this.createArray(0, currentMinute)
              : []),
            ...(isSameStartHour ? this.createArray(0, startMinute) : []),
          ];
        }
        return [
          ...(selectTodayAfter && statusEndisSameCurrentHour
            ? this.createArray(0, currentMinute)
            : []),
        ];
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
    const {
      showToday,
      format,
      selectTodayAfter,
      valueType,
      placeholder = [],
    } = this.props;

    return (
      <Row gutter={24}>
        <LayoutCol span={12}>
          <SingleDatePicker
            placeholder={placeholder[0]}
            format={format}
            value={startTime}
            showToday={showToday}
            valueType={valueType}
            valueStatus={ValueStatus.Start}
            disabledDate={this.disabledDate}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
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
            placeholder={placeholder[1]}
            format={format}
            value={endTime}
            showToday={showToday}
            valueType={valueType}
            selectTodayAfter={selectTodayAfter}
            valueStatus={ValueStatus.End}
            disabledDate={this.disabledDate}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            onChange={this.onChange}
            defaultPickerValue={startTime ? moment(startTime) : undefined}
          />
        </Col>
      </Row>
    );
  }
}

export default RangePicker;
