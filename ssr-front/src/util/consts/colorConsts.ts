export const ALL_COLOR = {
  BACKGROUND: "#111111",
  BEIGE: "#EFBE85",
  BLACK: "#010101",
  BLUE: "#00489a",
  DARK_GRAY: "#B8B8B8",
  DARK_YELLOW: "#d2b82e",
  GRAY: "#808080",
  LIGHT_GRAY: "#626262",
  LIGHT_PURPLE: "#9dafe4",
  MAP_BLACK: "#191D27",
  ORANGE: "#FFA34E",
  PINK: "#ff80ed",
  RED: "#FF0000",
  SCROLL_HOVER: "#B4B4B4",
  SCROLL_THUMB: "#EEEEEE",
  SCROLL_TRACK: "#5C5C5C",
  SKY_BLUE: "#83c8ef",
  THREE_BACKGROUND: "#1e1e24",
  WHITE: "#ffffff",
  YELLOW: "#ffd700",

  // Item
  DISABLE: "#f4f4f4",
  EXTRACTION: "#000000",
  OTHER_COLOR: "#a19756",
  PMC_EXTRACTION: "#07bdff",
  SCAV_EXTRACTION: "#feba4f",
  SHARED_EXTRACTION: "#c381fd",
  SVG_EXTRACTION_BLUE: "#44B8EA",

  // Shadow
  WHITE_SHADOW: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  BLACK_SHADOW: "0px 2px 4px rgba(1, 1, 1, 0.8)",
  YELLOW_SHADOW: "0px 1px 1px rgb(202, 238, 18, 0.7)",
  BOX_SHADOW: "0 0 14px rgb(202, 238, 18, 0.7)",
} as const;

export type AllColorKeys = keyof typeof ALL_COLOR;
