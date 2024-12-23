import { Column } from "@/types/types";

export const filterColumnValues = (
  column: Column,
  filterValues: string[]
): Column => {
  const filteredValueKr =
    column.value_kr?.filter((item) => filterValues.includes(item)) || [];

  return {
    ...column,
    value_kr: filteredValueKr,
  };
};
