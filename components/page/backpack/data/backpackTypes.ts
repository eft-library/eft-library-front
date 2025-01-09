export interface BackpackList {
  backpackList: Backpack[];
}
interface Backpack {
  name: string;
  image: string;
  id: string;
  capacity: number;
  grids: Size[];
  weight: number;
}
interface Size {
  width: number;
  height: number;
}