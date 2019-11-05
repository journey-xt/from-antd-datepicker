import { ValutType, PickerValue, ValueStatus } from './SingleDatePicker.d';

export interface RangePickerValue {
  [ValueStatus.Start]: ValutType | undefined;
  [ValueStatus.End]: ValutType | undefined;
}
