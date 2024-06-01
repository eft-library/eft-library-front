// json column 가져오기
export const useColumnListByJson = (columnObj, columnKey, isMap) => {
  const col = columnObj.find((item) => item.id === columnKey).json_value;
  if (isMap) {
    col.sort((a, b) => a.order - b.order);
  }
  return col;
};

// kr column 가져오기
export const useColumnListByKr = (columnObj, columnKey) => {
  return columnObj.find((item) => item.id === columnKey).value_kr;
};
