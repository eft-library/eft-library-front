import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function QuestRelated({
  color,
  width,
  height,
  opacity,
  x,
  y,
}: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        className="cls-1"
        fill={ALL_COLOR.QUEST_RELATED_ONE}
        d="M13.63,23.34c-4.56,0-8.28-4.29-8.28-9.57S9.07,4.2,13.63,4.2s8.28,4.29,8.28,9.57S18.2,23.34,13.63,23.34Zm0-17.15c-3.46,0-6,3.4-6,7.58s2.53,7.57,6,7.57,6-3.52,6-7.7S17.09,6.19,13.63,6.19Z"
      />
      <ellipse
        className="cls-2"
        fill={ALL_COLOR.QUEST_RELATED_TWO}
        strokeMiterlimit={10}
        strokeWidth={0.5}
        cx="13.62"
        cy="13.78"
        rx="8.49"
        ry="9.81"
      />
      <ellipse
        className="cls-2"
        fill={ALL_COLOR.QUEST_RELATED_TWO}
        strokeMiterlimit={10}
        strokeWidth={0.5}
        cx="13.63"
        cy="13.77"
        rx="5.99"
        ry="7.36"
      />
      <path d="M15,18.33l5.75,5,2-2.26-5.75-5ZM22,21.11l-1.37,1.58-5-4.39L17,16.72Z" />
      <rect
        className="cls-1"
        fill={ALL_COLOR.QUEST_RELATED_ONE}
        x="17.77"
        y="16.37"
        width="2.1"
        height="6.68"
        transform="translate(-8.4 20.94) rotate(-48.91)"
      />
    </svg>
  );
}
