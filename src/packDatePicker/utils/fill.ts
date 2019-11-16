// 判断 数字小于 10 加‘0’前缀
const fillTen = (number: number): string => {
  if (number < 10) {
    return `0${number}`;
  }
  return String(number);
};

export { fillTen };
