import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "@/types/types";

export default function WoodBox({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-1"
          fill={ALL_COLOR.WHITE}
          d="M25.45,10.71,21.29,6.57H6.64L2.55,10.71h0V21h22.9V10.71h0Zm-1,.42v9h-21v-9h0l3.66-3.7H20.81l3.65,3.7Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="21.12 9.17 20.39 8.43 17.01 8.43 17.35 9.17 21.12 9.17"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="23.05 11.13 22.07 10.13 17.79 10.13 18.24 11.13 23.05 11.13"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="17.74 10.03 21.97 10.03 21.2 9.26 17.39 9.26 17.74 10.03"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-3"
          fill={ALL_COLOR.WOOD_BOX_THREE}
          x="4.46"
          y="13.47"
          width="19"
          height="1.31"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-3"
          fill={ALL_COLOR.WOOD_BOX_THREE}
          x="4.46"
          y="16.29"
          width="19"
          height="1.31"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-3"
          fill={ALL_COLOR.WOOD_BOX_THREE}
          x="4.46"
          y="14.88"
          width="19"
          height="1.31"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <rect
          className="cls-3"
          fill={ALL_COLOR.WOOD_BOX_THREE}
          x="4.46"
          y="17.71"
          width="19"
          height="1.42"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-3"
          fill={ALL_COLOR.WOOD_BOX_THREE}
          points="23.46 13.37 23.46 12.13 18.37 12.13 18.39 13.21 17.39 13.21 17.39 12.13 10.42 12.13 10.42 13.21 9.42 13.21 9.44 12.13 4.46 12.13 4.46 13.37 23.46 13.37"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="10.46 9.17 10.8 8.43 7.54 8.43 6.8 9.17 10.46 9.17"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="10.03 10.13 5.86 10.13 4.87 11.13 9.57 11.13 10.03 10.13"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="5.95 10.03 10.07 10.03 10.42 9.26 6.72 9.26 5.95 10.03"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="10.67 11.13 17.14 11.13 16.69 10.13 11.12 10.13 10.67 11.13"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="16.25 9.17 15.91 8.43 13.95 8.43 13.84 8.43 11.9 8.43 11.56 9.17 16.25 9.17"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WOOD_BOX_TWO}
          points="11.17 10.03 16.64 10.03 16.29 9.26 11.52 9.26 11.17 10.03"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M20.81,7.43H7.12l-3.66,3.7h0v9h21v-9h0ZM4.46,16.29h19v1.32h-19Zm19-.1h-19V14.88h19Zm-19-1.41V13.47h19v1.31Zm12.68-3.65H10.67l.45-1h5.57Zm-11.29-1H10l-.46,1H4.87ZM22,10H17.74l-.35-.77H21.2Zm-5.33,0H11.17l.35-.77h4.77Zm-6.57,0H6l.77-.77h3.7Zm12,.1,1,1H18.24l-.46-1Zm-1.68-1.7.73.74H17.35L17,8.43Zm-6.55,0h2.07l.34.74H11.56l.34-.74Zm-6.3,0H10.8l-.34.74H6.8Zm1.9,3.7,0,1.08h1V12.13h7v1.08h1l0-1.08h5.09v1.24h-19V12.13Zm-5,7V17.71h19v1.42Z" />
      </g>
    </>
  );
}
