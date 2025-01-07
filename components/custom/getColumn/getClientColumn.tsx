import { cn } from "@/lib/utils";

interface GetClientColumn {
  columnList: Column[];
  columnLength: number;
}

interface Column {
  name: string;
  colSpan: number;
}

export default function GetClientColumn({
  columnList,
  columnLength,
}: GetClientColumn) {
  return (
    <div
      className={cn(
        `grid grid-cols-${columnLength} gap-2 w-full border-solid border-2 border-white rounded-lg sticky top-16 bg-Background z-10`
      )}
    >
      {columnList.map((val, index) => (
        <div
          key={`${val.name}-${index}-${val.colSpan}`}
          className={cn(
            `col-span-${val.colSpan} flex justify-center items-center`
          )}
        >
          <span className="font-bold p-1 text-lg">{val.name}</span>
        </div>
      ))}
    </div>
  );
}
