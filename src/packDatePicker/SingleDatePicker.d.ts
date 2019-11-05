import { Moment as StatementMoment } from 'moment/moment.d';

export enum ValueType {
  TimeStamp = 'timeStamp', // 时间戳
  TimeString = 'timeString', // 字符串时间
  Moment = 'moment', // moment对象
}

export enum ValueStatus {
  Start = 'start', // 开始时间
  End = 'end', // 结束时间
}

export type PickerValue = string | number | StatementMoment;
