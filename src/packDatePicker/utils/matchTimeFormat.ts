import { pattern } from "../tools/regex";

const matchTimeFormat = (regexp: string) => {
  const timeFormat = regexp.match(pattern.TimeFormat);
  return timeFormat;
};

export { matchTimeFormat };
