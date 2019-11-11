import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import { transformMoment, transformTimeStamp } from "../utils";

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
  onChange?: (value?: PickerValue, valueStatus?: ValueStatus) => void;
  defaultPickerValue?: Moment;
  showToday?: boolean;
  value?: string | number | Moment | Date;
}

const SingleDatePicker = (props: SingleDatePickerProps, ref) => {
  const {
    // format = "YYYY-MM-DD",
    valueStatus = ValueStatus.Start,
    valueType = ValueType.TimeStamp,
    value,
    onChange,
    showToday,
    defaultPickerValue,
    disabledDate,
    selectTodayAfter,
  } = props;

  const [dateValue, setDateValue] = useState(transformMoment(value));

  // 变化回调
  const dateChange = useCallback(
    (date: Moment | null, dateString?: string) => {
      if (onChange) {
        switch (valueType) {
          case ValueType.TimeStamp:
            return onChange(transformTimeStamp(date, valueStatus), valueStatus);
          case ValueType.TimeString:
            return onChange(dateString, valueStatus);
          case ValueType.Moment:
          default:
            return onChange(date, valueStatus);
        }
      } else {
        setDateValue(transformMoment(value));
      }
    },
    [onChange, valueType, valueStatus]
  );

  // 不可选择时间回调
  const disabledTime = useCallback(
    (currentDate: Moment | undefined) => {
      // 传递外层API 禁用日期
      if (disabledDate && currentDate) {
        return disabledDate(currentDate, valueStatus);
      }
      if (selectTodayAfter) {
        if (currentDate) {
          return currentDate.isBefore(dateValue, "day");
        }
        return false;
      }
      return false;
    },
    [disabledDate, selectTodayAfter, dateValue, valueStatus]
  );

  useEffect(
    () => {
      setDateValue(transformMoment(value));
    },
    [value]
  );

  if (!ref) {
    ref.current = () => {};
  }

  return (
    <PackDataPick
      value={dateValue}
      onChange={dateChange}
      disabledDate={disabledTime}
      defaultPickerValue={defaultPickerValue}
      showToday={showToday}
      //  renderExtraFooter={this.renderExtraFooter}
    />
  );
};

export default React.forwardRef(SingleDatePicker);
