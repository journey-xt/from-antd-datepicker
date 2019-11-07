import moment from "moment";

/**
 * 传入 一个 时间 格式的 字符串 或者 时间戳  转换为momnet
 */
const transformMoment = (
  date?: string | number | moment.Moment | Date
): moment.Moment | undefined => {
  const transformDate = moment(date);
  if (date && transformDate.isValid()) {
    return transformDate;
  }
  return undefined;
};

export { transformMoment };
