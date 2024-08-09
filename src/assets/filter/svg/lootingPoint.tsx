import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function LootingPoint({
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
      viewBox="0 0 26 25"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
    >
      <path
        className="cls-1"
        fill={ALL_COLOR.WHITE}
        d="M13,0l-.89,1.82L9,8.23l-7,1L0,9.55,1.43,11,6.5,16,5.3,23,5,25l1.78-.94L13,20.73l6.26,3.33L21,25l-.34-2L19.5,16l5.07-5L26,9.55l-2-.29-7-1L13.89,1.82,13,0Z"
      />
      <path
        className="cls-2"
        fill={ALL_COLOR.LOOTING_POINT_TWO}
        d="M13,2,9.6,8.91,2,10,7.5,15.4,6.2,23,13,19.41,19.8,23l-1.3-7.6L24,10,16.4,8.91,13,2Z"
      />
      <path d="M13,4.27l2.5,5.08.23.48.52.07,5.61.82-4.06,4-.37.36.08.52,1,5.6-5-2.64L13,18.28l-.47.25-5,2.64,1-5.6.08-.52-.37-.36-4.06-4L9.75,9.9l.52-.07.23-.48L13,4.27M13,2,9.6,8.91,2,10,7.5,15.4,6.2,23,13,19.41,19.8,23l-1.3-7.6L24,10,16.4,8.91,13,2Z" />
    </svg>
  );
}
