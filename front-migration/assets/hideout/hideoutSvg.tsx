import AirFilteringUnit from "./airFilteringUnit";
import BitCoinFarm from "./bitCoinFarm";
import BoozeGenerator from "./boozeGenerator";
import CultistCircle from "./cultistCircle";
import DefectiveWall from "./defectiveWall";
import GearRack from "./gearRack";
import Generator from "./generator";
import Gym from "./gym";
import HallOfFame from "./hallOfFame";
import Heating from "./heating";
import Illumination from "./illumination";
import IntelligenceCenter from "./intelligenceCenter";
import Lavatory from "./lavatory";
import Library from "./library";
import MedStation from "./medStation";
import NutritionUnit from "./nutritionUnit";
import RestSpace from "./restSpace";
import ScavCase from "./scavCase";
import Security from "./security";
import ShootingRange from "./shootingRange";
import SolarPower from "./solarPower";
import Stash from "./stash";
import Vents from "./vents";
import WaterCollector from "./waterCollector";
import WeaponRack from "./weaponRack";
import Workbench from "./workbench";
import ChristmasTree from "./christmasTree";

export const StationSvg = {
  AirFilteringUnit,
  BitCoinFarm,
  BoozeGenerator,
  CultistCircle,
  DefectiveWall,
  GearRack,
  Generator,
  Gym,
  HallOfFame,
  Heating,
  Illumination,
  IntelligenceCenter,
  Lavatory,
  Library,
  MedStation,
  NutritionUnit,
  RestSpace,
  ScavCase,
  Security,
  ShootingRange,
  SolarPower,
  Stash,
  Vents,
  WaterCollector,
  WeaponRack,
  Workbench,
  ChristmasTree,
};

export const StationSvgComponents = {
  "5d494a315b56502f18c98a0a": StationSvg.AirFilteringUnit,
  "5d494a445b56502f18c98a10": StationSvg.BitCoinFarm,
  "5d494a3f5b56502f18c98a0e": StationSvg.BoozeGenerator,
  "667298e75ea6b4493c08f266": StationSvg.CultistCircle,
  "637b39f02e873739ec490215": StationSvg.DefectiveWall,
  "65e5bb1713227bb7690cea0a": StationSvg.GearRack,
  "5d3b396e33c48f02b81cd9f3": StationSvg.Generator,
  "6377a9b9a93bde8fa30eb79a": StationSvg.Gym,
  "5d494a295b56502f18c98a08": StationSvg.HallOfFame,
  "5d388e97081959000a123acf": StationSvg.Heating,
  "5d494a205b56502f18c98a06": StationSvg.Illumination,
  "5d484fdf654e7600691aadf8": StationSvg.IntelligenceCenter,
  "5d484fba654e7600691aadf7": StationSvg.Lavatory,
  "5d494a0e5b56502f18c98a02": StationSvg.Library,
  "5d484fcd654e7668ec2ec322": StationSvg.MedStation,
  "5d484fd1654e76006732bf2e": StationSvg.NutritionUnit,
  "5d484fd6654e76051d3cc791": StationSvg.RestSpace,
  "5d494a175b56502f18c98a04": StationSvg.ScavCase,
  "5d484fb3654e7600681d9314": StationSvg.Security,
  "5d484fe3654e76006657e0ac": StationSvg.ShootingRange,
  "5d494a385b56502f18c98a0c": StationSvg.SolarPower,
  "5d484fc0654e76006657e0ab": StationSvg.Stash,
  "5d473c1e081959000e530190": StationSvg.Vents,
  "5d484fc8654e760065037abf": StationSvg.WaterCollector,
  "63db64cbf9963741dc0d741f": StationSvg.WeaponRack,
  "5d484fda654e7600681d9315": StationSvg.Workbench,
  "5df8a81f8f77747fcf5f5702": StationSvg.ChristmasTree,
};

export const getStationSVG = (
  id: string,
  width: number,
  height: number,
  color: string
) => {
  if (!(id in StationSvgComponents)) {
    return null;
  }
  const Svg = StationSvgComponents[id as keyof typeof StationSvgComponents];

  if (!Svg) {
    return null;
  }

  return <Svg height={height} width={width} color={color} />;
};
