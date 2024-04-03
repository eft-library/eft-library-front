/**
 * 16진수를 hex값으로 변경하는 함수
 */
export const useHexFromDecimal = (decimal) => {
  return '#' + ('000000' + decimal.toString(16)).slice(-6);
};
