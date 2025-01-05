import Chzzk from "@/assets/footer/chzzk";
import Github from "@/assets/footer/github";
import Youtube from "@/assets/footer/youtube";
import ItemSvg from "@/assets/filter/itemSvg";

interface DynamicSVG {
  svgValue: string;
  isEnable: boolean;
  x: number;
  y: number;
  scale: number;
}

interface FooterSVG {
  svgValue: string;
}

const svgComponents = {
  AMMO_BOX: ItemSvg.AmmoBox,
  BOSS_SPAWN: ItemSvg.BossSpawn,
  CASH_REGISTER: ItemSvg.CashRegister,
  COMPUTER: ItemSvg.Computer,
  CULTIST_SPAWN: ItemSvg.CultistSpawn,
  DEAD_BODY: ItemSvg.DeadBody,
  DRAWERS: ItemSvg.Drawers,
  GRENADE_BOX: ItemSvg.GrenadeBox,
  HIDDEN_STASH: ItemSvg.HiddenStash,
  JACKET: ItemSvg.Jacket,
  KEY: ItemSvg.Key,
  KEY_CARD: ItemSvg.KeyCard,
  LEVER: ItemSvg.Lever,
  LOCKED: ItemSvg.Locked,
  LOOTING_POINT: ItemSvg.LootingPoint,
  MARKED_ROOM: ItemSvg.MarkedRoom,
  MED_BAG: ItemSvg.MedBag,
  MED_CASE: ItemSvg.MedCase,
  MINE_AREA: ItemSvg.MineArea,
  NO_ENTRY: ItemSvg.NoEntry,
  PMC_EXTRACTION: ItemSvg.PmcExtraction,
  PMC_SPAWN: ItemSvg.PmcSpawn,
  QUEST_RELATED: ItemSvg.QuestRelated,
  ROUGE_SPAWN: ItemSvg.RougeSpawn,
  SAFE: ItemSvg.Safe,
  SCAV_EXTRACTION: ItemSvg.ScavExtraction,
  SCAV_SPAWN: ItemSvg.ScavSpawn,
  SHARED_EXTRACTION: ItemSvg.SharedExtraction,
  SNIPER_LOCATION: ItemSvg.SniperLocation,
  SNIPER_SCAV_SPAWN: ItemSvg.SniperScavSpawn,
  SPORTS_BAG: ItemSvg.SportsBag,
  STATIONARY_WEAPON: ItemSvg.StationaryWeapon,
  SUITCASE: ItemSvg.Suitcase,
  SUPPLY_CRATE: ItemSvg.SupplyCrate,
  TOOL_BOX: ItemSvg.ToolBox,
  WEAPON_BOX: ItemSvg.WeaponBox,
  WOOD_BOX: ItemSvg.WoodBox,
};

export const ItemSVG = ({ x, y, svgValue, isEnable }: DynamicSVG) => {
  if (!(svgValue in svgComponents)) {
    return null;
  }
  const itemHeight = 30;
  const itemWidth = 30;
  const Svg = svgComponents[svgValue as keyof typeof svgComponents];

  if (!Svg) {
    return null;
  }

  return (
    <Svg
      x={x}
      y={y}
      height={itemHeight}
      width={itemWidth}
      opacity={isEnable ? "1" : "0.5"}
    />
  );
};

export const FooterSVG = ({ svgValue }: FooterSVG) => {
  const footerHeigth = 40;
  const footerWidth = 40;

  switch (svgValue) {
    case "HJ":
      return <Chzzk height={footerHeigth} width={footerWidth} />;
    case "SY":
      return <Github height={footerHeigth} width={footerWidth} />;
    case "JY":
      return <Youtube height={footerHeigth} width={footerWidth} />;
  }
};