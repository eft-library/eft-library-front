import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { JPG } from "@/types/types";

export default function QuestRelated({ x, y }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.QUEST_RELATED_ONE}
          d="M13.63,23.34c-4.56,0-8.28-4.29-8.28-9.57S9.07,4.2,13.63,4.2s8.28,4.29,8.28,9.57S18.2,23.34,13.63,23.34Zm0-17.15c-3.46,0-6,3.4-6,7.58s2.53,7.57,6,7.57,6-3.52,6-7.7S17.09,6.19,13.63,6.19Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
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
      </g>
      <g transform={`translate(${x}, ${y})`}>
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
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path d="M15,18.33l5.75,5,2-2.26-5.75-5ZM22,21.11l-1.37,1.58-5-4.39L17,16.72Z" />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <rect
          className="cls-1"
          fill={ALL_COLOR.QUEST_RELATED_ONE}
          x="17.77"
          y="16.37"
          width="2.1"
          height="6.68"
          transform="translate(-8.4 20.94) rotate(-48.91)"
        />
      </g>
    </>
  );
}
