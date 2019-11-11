import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import moment from "moment";
// 声明文件
import { Moment } from "moment/moment.d";
import { RangePickerValue } from "./typeing";
// 组件引用
import SingleDatePicker, {
  ValueStatus,
  ValueType,
  PickerValue,
} from "../SingleDatePicker";

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
interface Props {
  disabledDate?: (
    currentDate: Moment | undefined,
    valueStatus?: ValueStatus
  ) => boolean;
  selectTodayAfter?: boolean;
  valueStatus?: ValueStatus;
  format?: string | string[];
  valueType?: ValueType;
  onChange?: (value: RangePickerValue) => void;
  showToday?: boolean;
  value?: RangePickerValue;
}

const RangePicker = (props: Props) => {
  const { showToday, onChange, value, selectTodayAfter, disabledDate } = props;

  const [RangeValue, setRangeValue] = useState<RangePickerValue>({
    [ValueStatus.Start]: undefined,
    [ValueStatus.End]: undefined,
  });

  // 时间变化回调
  const rangeChange = useCallback(
    (value?: PickerValue, valueStatus?: ValueStatus) => {
      if (onChange) {
        onChange({
          ...RangeValue,
          ...(valueStatus ? { [valueStatus]: value } : {}),
        });
      } else {
        setRangeValue({
          ...RangeValue,
          ...(valueStatus ? { [valueStatus]: value } : {}),
        });
      }
    },
    [onChange, RangeValue]
  );

  // 不可选择时间回调
  const rangeDisabledDate = useCallback(
    (currentDate: Moment | undefined, valueStatus?: ValueStatus) => {
      // 上层 不可选择时间段 回调
      if (disabledDate) {
        return disabledDate(currentDate, valueStatus);
      }

      const startTime = RangeValue[ValueStatus.Start];
      const endTime = RangeValue[ValueStatus.End];

      switch (valueStatus) {
        case ValueStatus.Start:
          if (selectTodayAfter) {
            if (currentDate && !endTime) {
              return currentDate.isBefore(moment());
            }
            if (currentDate && endTime) {
              return (
                currentDate.isBefore(moment()) || currentDate.isAfter(endTime)
              );
            }
            return false;
          }
          return false;
        case ValueStatus.End:
          if (selectTodayAfter) {
            if (currentDate && !startTime) {
              return currentDate.isBefore(moment());
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
    },
    [RangeValue, disabledDate]
  );

  // 上层porps变化
  useEffect(
    () => {
      if (value !== undefined) {
        setRangeValue(value);
      } else {
        setRangeValue({
          [ValueStatus.Start]: undefined,
          [ValueStatus.End]: undefined,
        });
      }
    },
    [value]
  );

  return (
    <Row gutter={24}>
      <LayoutCol span={12}>
        <SingleDatePicker
          value={RangeValue[ValueStatus.Start]}
          valueStatus={ValueStatus.Start}
          disabledDate={rangeDisabledDate}
          onChange={rangeChange}
          showToday={showToday}
          valueType={ValueType.TimeStamp}
          defaultPickerValue={
            RangeValue[ValueStatus.Start]
              ? moment(RangeValue[ValueStatus.Start])
              : undefined
          }
        />
      </LayoutCol>
      <LayoutDiv>
        <RelationSpan>~</RelationSpan>
      </LayoutDiv>
      <Col span={12}>
        <SingleDatePicker
          value={RangeValue[ValueStatus.End]}
          valueStatus={ValueStatus.End}
          disabledDate={rangeDisabledDate}
          showToday={showToday}
          onChange={rangeChange}
          valueType={ValueType.TimeStamp}
          defaultPickerValue={
            RangeValue[ValueStatus.Start]
              ? moment(RangeValue[ValueStatus.Start])
              : undefined
          }
        />
      </Col>
    </Row>
  );
};

export default RangePicker;
