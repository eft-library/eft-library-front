import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function Locked({ color, width, height, opacity, x, y }: SVG) {
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
      <rect
        className="cls-1"
        fill={ALL_COLOR.LOCKED_ONE}
        x="6.65"
        y="11.26"
        width="15.42"
        height="12.1"
        rx="2.45"
      />
      <path d="M14.2,15.28a1.31,1.31,0,0,0-.41,2.56V19.6h.82V17.84a1.31,1.31,0,0,0-.41-2.56Z" />
      <path d="M19.4,10.87H18.33V8a3.66,3.66,0,0,0-.87-2.59,4.09,4.09,0,0,0-3.15-1.16A4.1,4.1,0,0,0,11.15,5.4,3.62,3.62,0,0,0,10.28,8v2.92H9A3.15,3.15,0,0,0,5.85,14v6.6A3.15,3.15,0,0,0,9,23.76H19.4a3.15,3.15,0,0,0,3.15-3.15V14A3.15,3.15,0,0,0,19.4,10.87ZM11.75,5.93A3.34,3.34,0,0,1,14.31,5a3.32,3.32,0,0,1,2.55.89,3,3,0,0,1,.68,2v2.92H11.07V7.92A2.93,2.93,0,0,1,11.75,5.93Zm10,14.68A2.35,2.35,0,0,1,19.4,23H9a2.35,2.35,0,0,1-2.35-2.35V14A2.35,2.35,0,0,1,9,11.66H19.4A2.35,2.35,0,0,1,21.75,14Z" />
    </svg>
  );
}
