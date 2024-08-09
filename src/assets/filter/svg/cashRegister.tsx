import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function CashRegister({
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
        fill={ALL_COLOR.WHITE}
        d="M22.41,10.51V3.4H14.48V6.68h-9v3.83L3,19.22v4.92H25V19.22ZM24,23.22H4v-4H4l2.48-8.64V7.51H16.61V6.9H15.36V4.25h6.09V6.9H20v.61h1.41v3.42L24,19.22h0Z"
      />
      <rect
        className="cls-2"
        fill={ALL_COLOR.CASH_REGISTER_TWO}
        x="16.36"
        y="5.25"
        width="4.09"
        height="0.65"
      />
      <rect
        className="cls-3"
        fill={ALL_COLOR.CASH_REGISTER_THREE}
        x="17.61"
        y="6.9"
        width="1.44"
        height="0.6"
      />
      <path
        className="cls-4"
        fill={ALL_COLOR.CASH_REGISTER_FOUR}
        d="M5,22.22H23v-2H5Zm9-1.6a.54.54,0,0,1,0,1.07.54.54,0,0,1,0-1.07Z"
      />
      <rect
        className="cls-2"
        fill={ALL_COLOR.CASH_REGISTER_TWO}
        x="7.45"
        y="8.51"
        width="13"
        height="2"
      />
      <path
        className="cls-3"
        fill={ALL_COLOR.CASH_REGISTER_THREE}
        d="M20.58,11.51H7.23L5,19.22H22.9Zm-6.33,1.63h1.43l.09,1H14.25Zm0,1.85h1.61l.1,1H14.23Zm-1,2.85H6.92l1.34-4.7h5.19Zm1,0v-1H16l.1,1Zm2.48-4.7h1.38l.2,1H16.8ZM16.89,15h1.53l.19,1H17Zm.34,2.85-.12-1h1.66l.2,1Zm1.69-4.7h1.36l.31,1h-1.4Zm.5,1.85h1.43l.29,1H19.7Zm.46,1.83h1.53l.3,1H20.15Z"
      />
      <polygon
        className="cls-3"
        fill={ALL_COLOR.CASH_REGISTER_THREE}
        points="12.28 16.84 12.41 14.14 9.02 14.14 8.24 16.84 12.28 16.84"
      />
      <path d="M21.45,10.93V7.51H20V6.9h1.41V4.25H15.36V6.9h1.25v.61H6.45v3.07L4,19.22H4v4H24v-4h0Zm-5.09-5V5.25h4.09V5.9ZM19,6.9v.61H17.61V6.9ZM7.45,8.51h13v2h-13Zm-.22,3H20.58l2.32,7.71H5ZM23,22.22H5v-2H23Z" />
      <polygon points="15.68 13.14 14.25 13.14 14.25 14.14 15.77 14.14 15.68 13.14" />
      <polygon points="18.06 13.14 16.68 13.14 16.8 14.14 18.26 14.14 18.06 13.14" />
      <polygon points="20.28 13.14 18.92 13.14 19.19 14.14 20.59 14.14 20.28 13.14" />
      <polygon points="14.21 16.82 14.2 17.84 16.13 17.84 16.03 16.82 14.21 16.82" />
      <polygon points="17.11 16.82 17.23 17.84 18.97 17.84 18.77 16.82 17.11 16.82" />
      <polygon points="21.41 16.82 19.88 16.82 20.15 17.84 21.71 17.84 21.41 16.82" />
      <polygon points="15.85 14.99 14.23 14.99 14.23 15.98 15.95 15.98 15.85 14.99" />
      <polygon points="18.42 14.99 16.89 14.99 17.01 15.98 18.61 15.98 18.42 14.99" />
      <polygon points="20.85 14.99 19.43 14.99 19.7 15.98 21.14 15.98 20.85 14.99" />
      <path d="M6.92,17.84h6.32l.21-4.7H8.26Zm5.49-3.7-.13,2.7h-4L9,14.14Z" />
      <path d="M14,21.69a.54.54,0,1,0-.53-.54A.54.54,0,0,0,14,21.69Z" />
    </svg>
  );
}
