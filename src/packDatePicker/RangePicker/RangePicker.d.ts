import {
  ValueType,
  PickerValue,
  ValueStatus
} from "../SingleDatePicker/SingleDatePicker.d";

export interface RangePickerValue {
  [ValueStatus.Start]: ValueType | undefined;
  [ValueStatus.End]: ValueType | undefined;
}
