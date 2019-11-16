const pattern = {
  dateFormat: /YYYY([A-Za-z_\- \/])MM\1DD/, // 日期部分 正则
  TimeFormat: /HH((:)(mm\2ss|mm))?/ // 时间部分 正则
};

export { pattern };
