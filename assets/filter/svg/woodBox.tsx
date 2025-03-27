import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function WoodBox({ width, height, opacity, x, y }: SVG) {
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
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="21.38 6.26 20.64 5.52 17.27 5.52 17.61 6.26 21.38 6.26"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="23.31 8.22 22.32 7.22 18.04 7.22 18.5 8.22 23.31 8.22"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="18 7.12 22.23 7.12 21.46 6.35 17.64 6.35 18 7.12"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="10.56"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="13.38"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="11.97"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="14.8"
        width="19"
        height="1.42"
      />
      <polygon
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        points="23.72 10.46 23.72 9.22 18.62 9.22 18.65 10.3 17.65 10.3 17.65 9.22 10.67 9.22 10.67 10.3 9.67 10.3 9.7 9.22 4.72 9.22 4.72 10.46 23.72 10.46"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="10.72 6.26 11.06 5.52 7.79 5.52 7.06 6.26 10.72 6.26"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="10.28 7.22 6.11 7.22 5.12 8.22 9.83 8.22 10.28 7.22"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="6.21 7.12 10.33 7.12 10.68 6.35 6.97 6.35 6.21 7.12"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="10.93 8.22 17.4 8.22 16.94 7.22 11.38 7.22 10.93 8.22"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="16.51 6.26 16.17 5.52 14.21 5.52 14.1 5.52 12.15 5.52 11.82 6.26 16.51 6.26"
      />
      <polygon
        fill={ALL_COLOR.GoldenOak}
        className="cls-1"
        points="11.43 7.12 16.9 7.12 16.55 6.35 11.78 6.35 11.43 7.12"
      />
      <path d="M21.07,4.52H7.37L3.72,8.22h0v15h21v-15h0ZM4.72,13.38h19V14.7h-19Zm19-.1h-19V12h19Zm-19-1.41V10.56h19v1.31ZM17.4,8.22H10.93l.45-1h5.56Zm-11.29-1h4.17l-.45,1H5.12Zm16.12-.1H18l-.36-.77h3.82Zm-5.33,0H11.43l.35-.77h4.77Zm-6.57,0H6.21L7,6.35h3.71Zm12,.1,1,1H18.49l-.45-1Zm-1.68-1.7.74.74H17.61l-.34-.74Zm-6.54,0h2.07l.34.74H11.82l.33-.74Zm-6.31,0h3.27l-.34.74H7.06ZM9.7,9.22l0,1.09h1V9.22h7v1.09h1l0-1.09h5.1v1.24h-19V9.22Zm-5,7V14.8h19v1.42Z" />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="16.33"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="19.16"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="17.75"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.ChestnutBrown}
        className="cls-2"
        x="4.72"
        y="20.57"
        width="19"
        height="1.42"
      />
    </svg>
  );
}
