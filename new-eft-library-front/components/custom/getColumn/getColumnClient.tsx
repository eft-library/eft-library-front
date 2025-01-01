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

interface Column {
  id: string;
  type: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValue[] | null;
}

interface GetColumClient {
  columnDesign: number;
  column: Column;
  isWeapon?: boolean;
  isAmmo?: boolean;
  isExtraction?: boolean;
  isHideout?: boolean;
  isNote?: boolean;
  isQuest?: boolean;
}

export default function GetColumnClient({
  columnDesign,
  column,
  isWeapon = false,
  isAmmo = false,
  isExtraction = false,
  isHideout = false,
  isNote = false,
  isQuest = false,
}: GetColumClient) {
  const colSpanMapping = {
    isNote: (index: number) => (columnDesign === index + 2 ? 2 : 1),
    isWeapon: (index: number) => (index === 0 ? 2 : 1),
    isAmmo: (index: number) => (index === 9 ? 2 : 1),
    isExtraction: (index: number) => ([0, 5, 6].includes(index) ? 2 : 1),
    isHideout: (index: number) => ([0, 1].includes(index) ? 2 : 1),
    isQuest: (index: number) => (index === 4 ? 2 : 1),
    default: () => 1,
  };

  const checkColSpan = (index: number) => {
    if (isNote) return colSpanMapping.isNote(index);
    if (isWeapon) return colSpanMapping.isWeapon(index);
    if (isAmmo) return colSpanMapping.isAmmo(index);
    if (isExtraction) return colSpanMapping.isExtraction(index);
    if (isHideout) return colSpanMapping.isHideout(index);
    if (isQuest) return colSpanMapping.isQuest(index);
    return colSpanMapping.default();
  };

  const renderItems = () => {
    const items = column?.["value_kr"] || [];
    return items.map((item, index) => (
      <div
        key={item}
        className={`col-span-${checkColSpan(
          index
        )} flex justify-center items-center`}
      >
        <span
        >
          {item}
        </span>
      </div>
    ));
  };

  return (
    <div
      className={`grid grid-cols-${columnDesign} gap-2 w-full border-solid border-2 border-white`}
    >
      {renderItems()}
    </div>
  );
}
