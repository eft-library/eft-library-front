import type { DynamicJPG } from "@/types/types";
import ItemJpg from "@/assets/filter/itemJpg";

const jpgComponents = {
  AMMO_BOX: ItemJpg.AmmoBox,
  BOSS_SPAWN: ItemJpg.BossSpawn,
  CASH_REGISTER: ItemJpg.CashRegister,
  COMPUTER: ItemJpg.Computer,
  CULTIST_SPAWN: ItemJpg.CultistSpawn,
  DEAD_BODY: ItemJpg.DeadBody,
  DRAWERS: ItemJpg.Drawers,
  GRENADE_BOX: ItemJpg.GrenadeBox,
  HIDDEN_STASH: ItemJpg.HiddenStash,
  JACKET: ItemJpg.Jacket,
  KEY: ItemJpg.Key,
  KEY_CARD: ItemJpg.KeyCard,
  LEVER: ItemJpg.Lever,
  LOCKED: ItemJpg.Locked,
  LOOTING_POINT: ItemJpg.LootingPoint, // 데이터 추가
  MARKED_ROOM: ItemJpg.MarkedRoom, // 데이터 추가
  MED_BAG: ItemJpg.MedBag,
  MED_CASE: ItemJpg.MedCase,
  MINE_AREA: ItemJpg.MineArea, // 데이터 추가
  NO_ENTRY: ItemJpg.NoEntry, // 데이터 추가
  PMC_EXTRACTION: ItemJpg.PmcExtraction,
  PMC_SPAWN: ItemJpg.PmcSpawn,
  QUEST_RELATED: ItemJpg.QuestRelated,
  ROUGE_SPAWN: ItemJpg.RougeSpawn,
  SAFE: ItemJpg.Safe,
  SCAV_EXTRACTION: ItemJpg.ScavExtraction,
  SCAV_SPAWN: ItemJpg.ScavSpawn,
  SHARED_EXTRACTION: ItemJpg.SharedExtraction,
  SNIPER_LOCATION: ItemJpg.SniperLocation, // 데이터 추가
  SNIPER_SCAV_SPAWN: ItemJpg.SniperScavSpawn,
  SPORTS_BAG: ItemJpg.SportsBag,
  STATIONARY_WEAPON: ItemJpg.SportsBag, // 바꿔야 함
  SUITCASE: ItemJpg.Suitcase, // 데이터 추가
  SUPPLY_CRATE: ItemJpg.SupplyCrate,
  TOOL_BOX: ItemJpg.ToolBox,
  WEAPON_BOX: ItemJpg.WeaponBox,
  WOOD_BOX: ItemJpg.WoodBox,
};

export const ItemJPG = ({ x, y, svgValue }: DynamicJPG) => {
  const Jpg = jpgComponents[svgValue];

  if (!Jpg) {
    return null;
  }

  return <Jpg x={x} y={y} />;
};
