"use server";

import { cn } from "@/lib/utils";

interface JsonValue {
  id: string;
  link: string;
  name_kr: string;
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
  color?: string;
}

interface TableColumn {
  id: string;
  type: string;
  value_kr: string[];
  value_en: string[];
  json_value: JsonValue[] | null;
}

interface TableColumnProps {
  columnDesign: number;
  isWeapon?: boolean;
  isAmmo?: boolean;
  isExtraction?: boolean;
  isHideout?: boolean;
  isNote?: boolean;
  isQuest?: boolean;
  isProvision?: boolean;
  isMedical?: boolean;
  columnData: TableColumn;
}

export default async function TableColumn({
  columnData,
  columnDesign,
  isWeapon = false,
  isAmmo = false,
  isExtraction = false,
  isHideout = false,
  isNote = false,
  isQuest = false,
  isProvision = false,
  isMedical = false,
}: TableColumnProps) {
  // ColSpan 매핑
  const colSpanMapping = {
    isNote: (index: number) => (columnDesign === index + 2 ? 2 : 1),
    isWeapon: (index: number) => (index === 0 ? 2 : 1),
    isAmmo: (index: number) => ([1, 9].includes(index) ? 2 : 1),
    isExtraction: (index: number) => ([0, 5, 6].includes(index) ? 2 : 1),
    isHideout: (index: number) => ([0, 1].includes(index) ? 2 : 1),
    isQuest: (index: number) => (index === 4 ? 2 : 1),
    isProvision: (index: number) => (index === 1 || index === 4 ? 2 : 1),
    isMedical: (index: number) => ([1, 3, 4].includes(index) ? 2 : 1),
    default: () => 1,
  };

  const checkColSpan = (index: number) => {
    if (isNote) return colSpanMapping.isNote(index);
    if (isWeapon) return colSpanMapping.isWeapon(index);
    if (isAmmo) return colSpanMapping.isAmmo(index);
    if (isExtraction) return colSpanMapping.isExtraction(index);
    if (isHideout) return colSpanMapping.isHideout(index);
    if (isQuest) return colSpanMapping.isQuest(index);
    if (isProvision) return colSpanMapping.isProvision(index);
    if (isMedical) return colSpanMapping.isMedical(index);
    return colSpanMapping.default();
  };

  // 렌더링
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
          <span className={`font-bold p-1 ${isAmmo ? "text-xs" : "text-sm"}`}>
            {val}
          </span>
        </div>
      ))}
    </div>
  );
}
