const HOUR = "HH";

const MINUTE = "mm";

const SEC = "ss";

const HMS = "HH:mm:ss";

const HM = "HH:mm";

// 非公务员上班时间段
const SENIORPERSON = [0, 1, 2, 3, 4, 5, 6, 7, 23];

const TIMEFORMAT = [
  { format: HOUR, des: "时" },
  { format: MINUTE, des: "分" },
  { format: SEC, des: "秒" }
];

export { HOUR, HMS, HM, MINUTE, SEC, SENIORPERSON, TIMEFORMAT };
