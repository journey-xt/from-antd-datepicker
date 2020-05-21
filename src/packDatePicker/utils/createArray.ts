export const createArray = (start: number, end: number): number[] => {
  const array: number[] = [];
  const len = end;
  for (let i = start; i < len; i++) {
    array.push(i);
  }
  return array;
};
