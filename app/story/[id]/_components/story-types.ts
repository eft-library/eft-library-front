import { LocaleName } from "@/components/types/common";

export interface StorySelectorTypes {
  selector: SelectorTypes[];
}

export interface StoryDetailTypes {
  id: string;
  name: LocaleName;
  guide: LocaleName;
  objectives: LocaleName;
  requirements: LocaleName;
  order: number;
}

export interface StoryTypes {
  selector: SelectorTypes[];
  detail: StoryDetailTypes;
}

export interface StoryViewTypes {
  story: StoryTypes;
}

export interface SelectorTypes {
  id: string;
  name: LocaleName;
}

export interface StoryContentsTypes {
  storyDetail: StoryDetailTypes;
}

export interface StoryGuideTypes {
  guide: LocaleName;
}
