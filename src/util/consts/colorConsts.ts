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
  LIGHT_BLUE: "#00E0FF",
  SCROLL_HOVER: "#B4B4B4",
  SCROLL_THUMB: "#EEEEEE",
  SCROLL_TRACK: "#5C5C5C",
  SKY_BLUE: "#83c8ef",
  THREE_BACKGROUND: "#1e1e24",
  WHITE: "#ffffff",
  YELLOW: "#ffd700",
  LIGHT_YELLO: "#FDFFA7",
  LIGHT_GREEN: "#3DBA00",
  DARK_GREEN: "#2E6D0F",
  BRIGHT_GOLD: "#DE8E13",
  DARG_BROWN: "#694F27",
  CHOCOLATE_BROWN: "#86552D",
  BURGUNDY: "#831C16",
  DARK_MARRON: "#5B0803",
  LIGHT_RED: "#ff7a7a",
  QUEST_YELLO: "#ffe6a7",
  MAIN_YELLO: "#FFE1B5",
  HILIGHT_GRAY: "#616161",
  FOOTER_YELLO: "#FFC368",
  BOARD_HEADER_ORANGE: "#FFB245",

  // Shadow
  WHITE_SHADOW: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  BLACK_SHADOW: "0px 2px 4px rgba(1, 1, 1, 0.8)",
  YELLOW_SHADOW: "0px 1px 1px rgb(202, 238, 18, 0.7)",
  BOX_SHADOW: "0 0 14px rgb(202, 238, 18, 0.7)",
  BLUE_SHADOW: "0px 1px 1px rgb(144, 189, 255, 0.7)",
  MINT_SHADOW: "0px 1px 1px rgb(97, 255, 227)",
  RED_SHADOW: "0px 1px 1px rgb(255, 78, 78)",
  ORANGE_SHADOW: "0px 1px 1px rgb(255, 177, 105)",
  LIGHT_YELLOW_SHADOW: "0px 1px 1px rgb(255, 245, 0)",
  ICON_SAHDOW: "rgba(0, 0, 0, 0.6)",
  SPINNER_SHADOW: "rgba(144, 189, 255, 0.6)",
  EDITOR_IMAGE_SHADOW: "rgba(0, 0, 0, 0.5)",

  // HIDEOUT
  HIDE_RED: "#ff7676",
  HIDE_BLUE: "#3586ff",
  HIDE_ORANGE: "#ffa843",

  // Item
  DISABLE: "#f4f4f4",
  EXTRACTION: "#000000",
  OTHER_COLOR: "#a19756",
  PMC_EXTRACTION: "#07bdff",
  SCAV_EXTRACTION: "#feba4f",
  SHARED_EXTRACTION: "#c381fd",
  SVG_EXTRACTION_BLUE: "#44B8EA",
  AMMO_ONE: "#724c2e",
  AMMO_TWO: "#513b27",
  AMMO_THREE: "#ce9a4e",
  AMMO_FOUR: "#563c29",
  BOSS_SAPWN_TWO: "#4c4c4c",
  CASH_REGISTER_TWO: "#8b9bb7",
  CASH_REGISTER_THREE: "#c5d1ea",
  CASH_REGISTER_FOUR: "#7083a0",
  COMPUTER_TWO: "#636877",
  COMPUTER_THREE: "#b1beef",
  COMPUTER_FOUR: "#e2e6f2",
  COMPUTER_FIVE: "#7c7f8c",
  CULTIST_SPAWN_TWO: "#919191",
  DEAD_BODY_ONE: "#cecece",
  DRAWERS_TWO: "#658193",
  GRENADE_BOX_TWO: "#566d60",
  HIDDEN_STASH_TWO: "#727272",
  HIDDEN_STASH_THREE: "#a7e8fc",
  HIDDEN_STASH_FOUR: "#c4c6c6",
  HIDDEN_STASH_FIVE: "#80bc64",
  JACKET_ONE: "#5d8ddb",
  KEY_CARD_THREE: "#000",
  KEY_ONE: "#919190",
  KEY_THREE: "#e2e2e2",
  LEVER_ONE: "#9b9997",
  LEVER_TWO: "#000",
  LEVER_THREE: "#ff0303",
  LEVER_FOUR: "#303030",
  LOCKED_ONE: "#7f7942",
  LOOTING_POINT_TWO: "#ffff1d",
  MARKED_ROOM_TWO: "#1ffaff",
  MED_BAG_ONE: "#f26f16",
  MED_BAG_TWO: "#bfbfbf",
  MED_BAG_THREE: "#939393",
  MED_BAG_FOUR: "#445063",
  MED_BAG_FIVE: "#22395b",
  MED_CASE_TWO: "#ffcba4",
  MED_CASE_THREE: "#ffa350",
  MINE_AREA_TWO: "#ffff1d",
  MINE_AREA_THREE: "#046311",
  PMC_EXTRACTION_TWO: "#07bdff",
  PMC_SPAWN_TWO: "#009b00",
  QUEST_RELATED_ONE: "#7fd14a",
  QUEST_RELATED_TWO: "#000",
  ROUGE_SPAWN_ONE: "#3d3b3a",
  SAFE_TWO: "#a4a5a4",
  SCAV_EXTRACTION_TWO: "#feba4f",
  SHARED_EXTRACTION_TWO: "#c381fd",
  SPORTS_BAG_TWO: "#4f4f4f",
  SPORTS_BAG_THREE: "#af281e",
  SUITCASE_ONE: "#52427c",
  SUITCASE_TWO: "#9d7aea",
  SUITCASE_THREE: "#000",
  SUPPLY_CASE_TWO: "#aa8344",
  SUPPLY_CASE_THREE: "#8e6c3a",
  TOOL_BOX_TWO: "#4c4c4c",
  TOOL_BOX_THREE: "#dbdbdb",
  TOOL_BOX_FOUR: "#000",
  WEAPON_BOX_ONE: "#84684e",
  WEAPON_BOX_TWO: "#705436",
  WOOD_BOX_TWO: "#beead3",
  WOOD_BOX_THREE: "#a9dbc2",
  STATIONARY_TWO: "#ce9a4e",
  STATIONARY_THREE: "#ce9800",
  STATIONARY_FOUR: "#563c29",
  ETC_TWO: "#9a0400",
  ETC_THREE: "#1500ec",
  ETC_FOUR: "#ffec00",
  FOOD_TWO: "#7f7f7f",
} as const;

export type AllColorKeys = keyof typeof ALL_COLOR;