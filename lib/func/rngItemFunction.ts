import type {
  RngItemTypes,
  PlacedItem,
} from "@/app/minigame/_components/minigame-types";
import { BACKPACK_WIDTH, BACKPACK_HEIGHT } from "../consts/libraryConsts";

export const checkCanPlace = (
  item: RngItemTypes,
  x: number,
  y: number,
  rotated: boolean,
  placedItems: PlacedItem[],
) => {
  const w = rotated ? item.height : item.width;
  const h = rotated ? item.width : item.height;

  // 경계 체크
  if (x + w > BACKPACK_WIDTH || y + h > BACKPACK_HEIGHT) {
    return false;
  }

  // 충돌 체크
  return !placedItems.some((p) => {
    const pw = p.rotated ? p.height : p.width;
    const ph = p.rotated ? p.width : p.height;

    return !(x + w <= p.x || x >= p.x + pw || y + h <= p.y || y >= p.y + ph);
  });
};

export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array]; // 원본 보호

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};
