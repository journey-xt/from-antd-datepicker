import { ValueType, ValueStatus } from "../SingleDatePicker/enum";
import { PickerValue } from "../SingleDatePicker/typeing";

export interface RangePickerValue {
  [ValueStatus.Start]: PickerValue | undefined;
  [ValueStatus.End]: PickerValue | undefined;
}
