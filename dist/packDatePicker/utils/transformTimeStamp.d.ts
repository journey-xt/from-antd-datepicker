import { ValueStatus } from "../SingleDatePicker/enum";
import monent from "moment";
/**
 * 将传入的 moment 对象转换为 时间戳形式
 */
declare const transformTimeStamp: (date: monent.Moment | null, valueStatus?: ValueStatus | undefined) => number | undefined;
export { transformTimeStamp };
