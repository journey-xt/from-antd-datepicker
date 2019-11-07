import { ValueType, PickerValue, ValueStatus } from "../SingleDatePicker";

export interface RangePickerValue {
  [ValueStatus.Start]: ValueType | undefined;
  [ValueStatus.End]: ValueType | undefined;
}
