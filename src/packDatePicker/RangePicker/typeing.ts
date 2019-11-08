import { ValueType, ValueStatus } from "../SingleDatePicker/enum";

export interface RangePickerValue {
  [ValueStatus.Start]: ValueType | undefined;
  [ValueStatus.End]: ValueType | undefined;
}
