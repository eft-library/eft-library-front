import { cn } from "@/lib/utils";

interface TableColumn {
  value_kr: string[];
  value_en: string[];
}

interface TableColumnProps {
  columnDesign: number;
  isProvision?: boolean;
  isMedical?: boolean;
  isAmmo?: boolean;
  columnData: TableColumn;
}

export default function TableColumn({
  columnData,
  columnDesign,
  isProvision = false,
  isMedical = false,
  isAmmo = false,
}: TableColumnProps) {
  const colSpanMapping = {
    isAmmo: (index: number) => ([1, 9].includes(index) ? 2 : 1),
    isProvision: (index: number) => (index === 1 || index === 4 ? 2 : 1),
    isMedical: (index: number) => ([1].includes(index) ? 2 : 1),
    default: () => 1,
  };

  const checkColSpan = (index: number) => {
    if (isAmmo) return colSpanMapping.isAmmo(index);
    if (isProvision) return colSpanMapping.isProvision(index);
    if (isMedical) return colSpanMapping.isMedical(index);
    return colSpanMapping.default();
  };

  return (
    <div
      className={cn(
        `grid grid-cols-${columnDesign} gap-2 w-full border-solid border-2 border-white rounded-lg sticky top-16 bg-Background z-10`
      )}
    >
      {columnData.value_kr.map((val, index) => (
        <div
          key={val}
          className={cn(
            `col-span-${checkColSpan(index)} flex justify-center items-center`
          )}
        >
          <span className={`font-bold p-1 text-sm`}>{val}</span>
        </div>
      ))}
    </div>
  );
}
