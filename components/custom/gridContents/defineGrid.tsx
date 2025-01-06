interface DefineGrid {
  id: string;
  gap?: string;
  pageId: string;
  cols: string;
  children: React.ReactNode;
}

export default function DefineGrid({
  id,
  gap = "2",
  pageId,
  cols,
  children,
}: DefineGrid) {
  return (
    <div
      key={id}
      id={id}
      className={`${
        id === pageId && "bg-NeutralGray"
      } w-full grid grid-cols-${cols} border-solid border-white border-2 mb-2 rounded-lg p-3`}
      style={{
        gap,
      }}
    >
      {children}
    </div>
  );
}
