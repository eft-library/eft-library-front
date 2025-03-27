import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function CashRegister({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.SteelBlue}
        className="cls-1"
        x="16.35"
        y="5.21"
        width="4.09"
        height="0.65"
      />
      <rect
        fill={ALL_COLOR.CloudMist}
        className="cls-2"
        x="17.6"
        y="6.86"
        width="1.44"
        height="0.6"
      />
      <path
        fill={ALL_COLOR.SlateWave}
        className="cls-3"
        d="M5,22.18H23v-2H5Zm9-1.6a.53.53,0,0,1,.53.53.54.54,0,1,1-.53-.53Z"
      />
      <rect
        fill={ALL_COLOR.SteelBlue}
        className="cls-1"
        x="7.45"
        y="8.46"
        width="13"
        height="2"
      />
      <path
        fill={ALL_COLOR.CloudMist}
        className="cls-2"
        d="M20.57,11.46H7.22L5,19.18H22.9ZM14.24,13.1h1.43l.1,1H14.24Zm0,1.85h1.62l.09,1H14.22Zm-1,2.85H6.91l1.35-4.7h5.19Zm1,0v-1H16l.11,1Zm2.47-4.69h1.39l.19,1H16.79ZM16.88,15h1.54l.19,1H17Zm.35,2.84-.13-1h1.67l.19,1Zm1.68-4.69h1.36l.31,1h-1.4ZM19.42,15h1.42l.3,1H19.69Zm.45,1.83H21.4l.31,1H20.14Z"
      />
      <polygon
        fill={ALL_COLOR.CloudMist}
        className="cls-2"
        points="12.28 16.8 12.4 14.1 9.01 14.1 8.24 16.8 12.28 16.8"
      />
      <path d="M21.45,10.89V7.46H20v-.6h1.41V4.21h-6.1V6.86H16.6v.6H6.45v3.08L4,19.18H4v4H24v-4h0Zm-5.1-5V5.21h4.1v.65Zm2.69,1v.6H17.6v-.6ZM7.45,8.46h13v2h-13Zm-.23,3H20.57l2.33,7.72H5ZM23,22.18H5v-2H23Z" />
      <polygon points="15.67 13.1 14.24 13.1 14.24 14.1 15.77 14.1 15.67 13.1" />
      <polygon points="18.06 13.1 16.67 13.1 16.79 14.1 18.25 14.1 18.06 13.1" />
      <polygon points="20.27 13.1 18.91 13.1 19.18 14.1 20.58 14.1 20.27 13.1" />
      <polygon points="14.21 16.78 14.2 17.79 16.13 17.79 16.02 16.78 14.21 16.78" />
      <polygon points="17.1 16.78 17.23 17.79 18.96 17.79 18.77 16.78 17.1 16.78" />
      <polygon points="21.4 16.78 19.87 16.78 20.14 17.79 21.71 17.79 21.4 16.78" />
      <polygon points="15.85 14.95 14.23 14.95 14.22 15.94 15.94 15.94 15.85 14.95" />
      <polygon points="18.41 14.95 16.88 14.95 17.01 15.94 18.61 15.94 18.41 14.95" />
      <polygon points="20.84 14.95 19.42 14.95 19.69 15.94 21.14 15.94 20.84 14.95" />
      <path d="M6.91,17.8h6.32l.22-4.7H8.26Zm5.49-3.7-.12,2.7h-4L9,14.1Z" />
      <path d="M14,21.64a.53.53,0,0,0,.53-.53.54.54,0,0,0-1.07,0A.54.54,0,0,0,14,21.64Z" />
    </svg>
  );
}
