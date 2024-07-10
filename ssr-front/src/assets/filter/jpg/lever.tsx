import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { JPG } from "@/types/types";

export default function Lever({ x, y }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.LEVER_ONE}
          d="M13.88,13.9c0,.16,0,.31,0,.47,0,.53-.07,1-.13,1.52l2.87,2a2.65,2.65,0,0,1,.8-1.54Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-2"
          fill="none"
          stroke={ALL_COLOR.LEVER_TWO}
          strokeMiterlimit={10}
          strokeWidth={0.5}
          d="M13.88,13.9c0,.16,0,.31,0,.47,0,.53-.07,1-.13,1.52l2.87,2a2.65,2.65,0,0,1,.8-1.54Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.LEVER_THREE}
          d="M18.94,15.62a2.6,2.6,0,0,0-2,.71,2.55,2.55,0,0,0-.81,1.53,1.38,1.38,0,0,0,0,.2,2.64,2.64,0,1,0,2.83-2.44Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-2"
          fill="none"
          stroke={ALL_COLOR.LEVER_TWO}
          strokeMiterlimit={10}
          strokeWidth={0.5}
          d="M18.94,15.62a2.6,2.6,0,0,0-2,.71,2.55,2.55,0,0,0-.81,1.53,1.38,1.38,0,0,0,0,.2,2.64,2.64,0,1,0,2.83-2.44Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-4"
          fill={ALL_COLOR.LEVER_FOUR}
          d="M14,13.18c0-.16,0-.31,0-.47-.28-6-2.37-8.42-2.37-8.42H7.7V23.71h3.91a20.05,20.05,0,0,0,2.38-9C14,14.21,14,13.71,14,13.18Z"
        />
      </g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          className="cls-2"
          fill="none"
          stroke={ALL_COLOR.LEVER_TWO}
          strokeMiterlimit={10}
          strokeWidth={0.5}
          d="M14,13.18c0-.16,0-.31,0-.47-.28-6-2.37-8.42-2.37-8.42H7.7V23.71h3.91a20.05,20.05,0,0,0,2.38-9C14,14.21,14,13.71,14,13.18Z"
        />
      </g>
    </>
  );
}