import { Column } from "@/types/types";

export const filterColumnValues = (
  column: Column,
  filterValues: string[]
): Column => {
  if (column && column.value_kr) {
    const filteredValueKr =
      column.value_kr?.filter((item) => filterValues.includes(item)) || [];

    return {
      ...column,
      value_kr: filteredValueKr,
    };
  }

  return { ...column, value_kr: [] };
};
