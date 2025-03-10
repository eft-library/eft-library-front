import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function CultistSpawn({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M26,12.09a11,11,0,1,0-22,0A10.9,10.9,0,0,0,7,20v9H23V20A10.9,10.9,0,0,0,26,12.09Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.CULTIST_SPAWN_TWO}
          d="M24,11.9C24,6.43,20,2,15,2S6,6.43,6,11.9A10.23,10.23,0,0,0,8.45,19v8h13.1V19A10.23,10.23,0,0,0,24,11.9Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.RED}
          d="M8.59,8.56,8,9.18a2.93,2.93,0,0,0-.67,2.43A4.18,4.18,0,0,0,10.87,15a2.87,2.87,0,0,0,2.56-.88l.57-.62-.62-.57L9.21,9.12l-.62-.56Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M8.65,9.75l4.16,3.78a2.1,2.1,0,0,1-1.84.61,3.25,3.25,0,0,1-1.75-.84,2.57,2.57,0,0,1-.57-3.55M8.59,8.56,8,9.18a2.93,2.93,0,0,0-.67,2.43A4.18,4.18,0,0,0,10.87,15a2.87,2.87,0,0,0,2.56-.88l.57-.62-.62-.57L9.21,9.12l-.62-.56Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect x="14" y="22" width="2" height="1" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M15,2.71A9.16,9.16,0,0,1,24,12a9.35,9.35,0,0,1-2.71,6.64l-.29.29v7.78H9V18.93l-.29-.29A9.35,9.35,0,0,1,6,12a9.16,9.16,0,0,1,9-9.29m0-1A10.15,10.15,0,0,0,5,12a10.38,10.38,0,0,0,3,7.34v8.37H22V19.34A10.38,10.38,0,0,0,25,12,10.15,10.15,0,0,0,15,1.71Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-3"
          fill={ALL_COLOR.RED}
          d="M21.41,8.56l-.62.56L16.62,12.9l-.62.57.57.62a2.87,2.87,0,0,0,2.56.88,4.18,4.18,0,0,0,3.52-3.36A2.93,2.93,0,0,0,22,9.18l-.57-.62Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M21.35,9.75a2.57,2.57,0,0,1-.57,3.55,3.25,3.25,0,0,1-1.75.84,2.1,2.1,0,0,1-1.84-.61l4.16-3.78m.06-1.19-.62.56L16.62,12.9l-.62.57.57.62a2.87,2.87,0,0,0,2.56.88,4.18,4.18,0,0,0,3.52-3.36A2.93,2.93,0,0,0,22,9.18l-.57-.62Z" />
      </g>
    </>
  );
}
