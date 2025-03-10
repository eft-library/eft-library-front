import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function GrenadeBox({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M18,3.51H7.59V5.59H9.85V7.22A10.05,10.05,0,0,0,5.19,16c0,5.39,3.69,9.77,8.23,9.77S21.64,21.4,21.64,16a10.51,10.51,0,0,0-3-7.52L19,8.2l.25-.32s3.64,3.94,3.22,9l2.36.18C25.39,8,18,3.51,18,3.51Zm5.15,13A13.3,13.3,0,0,0,19,6.52a1.37,1.37,0,0,1-.06.82,1.3,1.3,0,0,1-.71.71,1.34,1.34,0,0,1-.51.11,1.44,1.44,0,0,1-.5-.1,1.37,1.37,0,0,1-.63-.58v.45a7.67,7.67,0,0,1,2.48,2.21l0,0c.22.31.42.63.61,1l0,.06a9.18,9.18,0,0,1,.44,1l.08.18c.13.35.25.71.35,1.08,0,0,0,.07,0,.11.08.33.14.67.19,1a2.54,2.54,0,0,1,0,.29A11.5,11.5,0,0,1,20.92,16c0,4.92-3.37,8.92-7.5,8.92s-7.51-4-7.51-8.92A9.87,9.87,0,0,1,6,14.79l0-.29a10.63,10.63,0,0,1,.23-1.15h0a9.77,9.77,0,0,1,.36-1.08l.1-.24a10.49,10.49,0,0,1,.49-1h0a9.54,9.54,0,0,1,.6-.91L8,9.91A8.07,8.07,0,0,1,9.46,8.44l.17-.12a6.81,6.81,0,0,1,.89-.54h0V5H8.17v-.9H17.5l.11.07c.28.18,6.82,4.55,6.46,12.31Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M17.22,5h-.65V6.16a1.33,1.33,0,0,1,1.32-.62C17.59,5.29,17.35,5.11,17.22,5Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M18,6A1,1,0,0,0,17.7,6a.87.87,0,0,0-.33,1.67.86.86,0,0,0,.67,0,.85.85,0,0,0,.46-.47A.87.87,0,0,0,18,6Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M19.05,10.14a7.67,7.67,0,0,0-2.48-2.21h0A7.56,7.56,0,0,1,19.05,10.14Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M20.85,14.83A11.5,11.5,0,0,1,20.92,16,11.5,11.5,0,0,0,20.85,14.83Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M9.46,8.44A8.07,8.07,0,0,0,8,9.91,8.07,8.07,0,0,1,9.46,8.44Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M6,14.5a10.63,10.63,0,0,1,.23-1.15A10.63,10.63,0,0,0,6,14.5Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M5.91,16A9.87,9.87,0,0,1,6,14.79,9.87,9.87,0,0,0,5.91,16Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M19.09,10.18a10.42,10.42,0,0,1,.61,1C19.51,10.81,19.31,10.49,19.09,10.18Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M9.63,8.32a6.81,6.81,0,0,1,.89-.54A6.81,6.81,0,0,0,9.63,8.32Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M6.25,13.34a9.77,9.77,0,0,1,.36-1.08A9.77,9.77,0,0,0,6.25,13.34Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M20.62,13.52c.08.33.14.67.19,1C20.76,14.19,20.7,13.85,20.62,13.52Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M6.71,12a10.49,10.49,0,0,1,.49-1A10.49,10.49,0,0,0,6.71,12Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M19.73,11.2a9.18,9.18,0,0,1,.44,1A9.18,9.18,0,0,0,19.73,11.2Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M20.25,12.33c.13.35.25.71.35,1.08C20.5,13,20.38,12.68,20.25,12.33Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M6.81,16c0,4.42,3,8,6.61,8s6.6-3.6,6.6-8-3-8-6.6-8S6.81,11.59,6.81,16Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M7.2,11a9.54,9.54,0,0,1,.6-.91A9.54,9.54,0,0,0,7.2,11Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.GRENADE_BOX_TWO}
          d="M15.67,7.5V5H11.42v2.4a6.35,6.35,0,0,1,2-.33A6.55,6.55,0,0,1,15.67,7.5Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M17.61,4.19l-.11-.07H8.17V5h2.35V7.78h0a6.81,6.81,0,0,0-.89.54l-.17.12A8.07,8.07,0,0,0,8,9.91l-.15.19a9.54,9.54,0,0,0-.6.91h0a10.49,10.49,0,0,0-.49,1l-.1.24a9.77,9.77,0,0,0-.36,1.08h0A10.63,10.63,0,0,0,6,14.5l0,.29A9.87,9.87,0,0,0,5.91,16c0,4.92,3.37,8.92,7.51,8.92s7.5-4,7.5-8.92a11.5,11.5,0,0,0-.07-1.18,2.54,2.54,0,0,0,0-.29c0-.35-.11-.69-.19-1,0,0,0-.07,0-.11-.1-.37-.22-.73-.35-1.08l-.08-.18a9.18,9.18,0,0,0-.44-1l0-.06a10.42,10.42,0,0,0-.61-1l0,0a7.56,7.56,0,0,0-2.48-2.21h0V7.48a1.37,1.37,0,0,0,.63.58,1.44,1.44,0,0,0,.5.1,1.34,1.34,0,0,0,.51-.11,1.3,1.3,0,0,0,.71-.71A1.37,1.37,0,0,0,19,6.52a13.3,13.3,0,0,1,4.19,9.94l.9,0C24.43,8.74,17.89,4.37,17.61,4.19ZM20,16c0,4.42-3,8-6.6,8s-6.61-3.6-6.61-8,3-8,6.61-8S20,11.59,20,16Zm-6.6-8.92a6.35,6.35,0,0,0-2,.33V5h4.25V7.5A6.55,6.55,0,0,0,13.42,7.09Zm3.15-.93V5h.65c.13.09.37.27.67.52A1.33,1.33,0,0,0,16.57,6.16Zm1.93,1a.85.85,0,0,1-.46.47A.87.87,0,0,1,16.9,6.51.85.85,0,0,1,17.7,6,1,1,0,0,1,18,6,.87.87,0,0,1,18.5,7.17Z" />
      </g>
    </>
  );
}
