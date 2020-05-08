import moment from "moment";
/**
 * 传入 一个 时间 格式的 字符串 或者 时间戳  转换为momnet
 */
declare const transformMoment: (date?: string | number | moment.Moment | Date | undefined) => moment.Moment | undefined;
export { transformMoment };
