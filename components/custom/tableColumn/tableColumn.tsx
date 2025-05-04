import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

interface TableColumn {
  en: string[];
  ja: string[];
  ko: string[];
}

interface TableColumnProps {
  columnDesign: number;
  isAmmoProvisions?: boolean;
  isExtraction?: boolean;
  columnData: TableColumn;
  isNameLarge?: boolean;
  isImageLarge?: boolean;
}

export default function TableColumn({
  columnData,
  columnDesign,
  isAmmoProvisions = false,
  isExtraction = false,
  isNameLarge = false,
}: TableColumnProps) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const colSpanMapping = {
    isAmmoProvisions: (index: number) => ([1, 4].includes(index) ? 2 : 1),
    isExtraction: (index: number) => {
      if ([0, 1].includes(index)) return 2;
      if ([5, 6].includes(index)) return 3;
      return 1;
    },
    isNameLarge: (index: number) => ([1].includes(index) ? 3 : 1),
    default: () => 1,
  };

  const checkColSpan = (index: number) => {
    if (isAmmoProvisions) return colSpanMapping.isAmmoProvisions(index);
    if (isExtraction) return colSpanMapping.isExtraction(index);
    if (isNameLarge) return colSpanMapping.isNameLarge(index);
    return colSpanMapping.default();
  };

  return (
    <div
      className={cn(
        `grid grid-cols-${columnDesign} gap-2 w-full border-solid border-2 border-white rounded-lg sticky top-16 bg-Background z-10 mb-2`
      )}
    >
      {columnData[localeKey].map((val, index) => (
        <div
          key={val}
          className={cn(
            `col-span-${checkColSpan(index)} flex justify-center items-center`
          )}
        >
          <span className={`font-bold p-1 text-lg`}>{val}</span>
        </div>
      ))}
    </div>
  );
}
