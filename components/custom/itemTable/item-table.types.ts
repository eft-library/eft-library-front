export interface ItemTableHeaderTypes {
  columns: ColumnHeader[];
  gridColSpan: number;
}

interface ColumnHeader {
  key: string;
  colSpan: number;
  align?: "left" | "center" | "right";
  colText: string;
}

export interface ItemTableRowWrapperTypes {
  urlMapping: string;
  dataLength: number;
  dataIndex: number;
  children: React.ReactNode;
  gridCols: number;
}

export interface ItemTableRowWrapperMTypes {
  urlMapping: string;
  children: React.ReactNode;
}
