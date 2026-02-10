import { LocaleName } from "@/components/types/common";
import { type Node, type MarkerType } from "@xyflow/react";

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
  html: string;
  onImageClick: (src: string) => void;
}

export interface ImageViewerDialogTypes {
  src: string | null;
  onClose: () => void;
}

interface MarkerEndTypes {
  type: MarkerType;
  color: string;
}

interface EdgeStyleTypes {
  stroke: string;
  strokeWidth: string;
  filter: string;
}

interface EdgeInfo {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  style: EdgeStyleTypes;
  markerEnd: MarkerEndTypes;
}

interface NodeMeta {
  value: string;
  desc: LocaleName;
}

export type CustomNodeTypes = Node<{
  id: string;
  nodeType:
    | "base"
    | "branch"
    | "craft"
    | "payment"
    | "achievement"
    | "penalty"
    | "timegate"
    | "ending";
  title: LocaleName;
  image: string;
  contents: LocaleName;
  nodeMeta: NodeMeta;
}>;

export interface NodeData {
  id: string;
  node_type:
    | "base"
    | "branch"
    | "craft"
    | "payment"
    | "achievement"
    | "penalty"
    | "timegate"
    | "ending";
  title: LocaleName;
  image: string;
  y_coordinate: number;
  x_coordinate: number;
  contents: LocaleName;
  node_meta: NodeMeta;
  edge: EdgeInfo[];
}
