// json column 가져오기
export const useColumnListByJson = (columnObj, columnKey, isMap) => {
  const col = columnObj.find(
    (item) => item.column_id === columnKey,
  ).column_json_value;
  if (isMap) {
    col.sort((a, b) => a.map_order - b.map_order);
  }
  return col;
};

// kr column 가져오기
export const useColumnListByKr = (columnObj, columnKey) => {
  return columnObj.find((item) => item.column_id === columnKey).column_value_kr;
};
