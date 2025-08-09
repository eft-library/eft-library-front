import type { Editor } from "@tiptap/react";

export interface PostEditorTypes {
  initialContent: string;
  onChange: (val: string) => void;
}

export interface ColorPaletteTypes {
  editor: Editor | null;
}

export interface IframeInsertDialogTypes {
  editor: Editor | null;
}

export interface ToolbarTypes {
  editor: Editor | null;
}

export interface TableControlsTypes {
  editor: Editor | null;
  inTable: boolean;
  deleteRowSmart: () => void;
}
