import { pattern } from "../tools/regex";
import { memoize } from "lodash";

const matchTimeFormat = memoize((regexp: string) => {
  const match = regexp.match(pattern.TimeFormat);

  return match;
});

export { matchTimeFormat };
