import Link from "next/link";

interface DefineGrid {
  id: string;
  gap?: string;
  pageId: string;
  cols: string;
  isDetail?: boolean;
  detailLink?: string;
  children: React.ReactNode;
}

export default function DefineGrid({
  id,
  gap = "2",
  pageId,
  cols,
  children,
  isDetail = false,
  detailLink = "",
}: DefineGrid) {
  if (isDetail) {
    return (
      <Link href={detailLink} target="_blank">
        <div
          key={id}
          id={id}
          className={`${
            id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-${cols} border-solid border-white border-2 mb-2 rounded-lg p-3
      ${isDetail && "hover:bg-NeutralGray"} ${isDetail && "cursor-pointer"}
      `}
          style={{
            gap,
          }}
        >
          {children}
        </div>
      </Link>
    );
  }

  return (
    <div
      key={id}
      id={id}
      className={`${
        id === pageId && "bg-NeutralGray"
      } w-full grid grid-cols-${cols} border-solid border-white border-2 mb-2 rounded-lg p-3
    `}
      style={{
        gap,
      }}
    >
      {children}
    </div>
  );
}
