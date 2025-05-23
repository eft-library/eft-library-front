import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function WeaponBox({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.AntiqueBronze}
        className="cls-1"
        points="23.81 10.08 21.08 6.42 17.41 6.42 18.81 10.08 18.81 10.08 23.81 10.08"
      />
      <polygon
        fill={ALL_COLOR.AntiqueBronze}
        className="cls-1"
        points="11.51 6.42 10.11 10.08 17.74 10.08 16.33 6.42 13.94 6.42 11.51 6.42"
      />
      <polygon
        fill={ALL_COLOR.WalnutBrown}
        className="cls-2"
        points="23.97 11.08 18.82 11.08 18.84 12.31 17.84 12.31 17.84 11.08 10.01 11.08 10.01 12.31 9.01 12.31 9.03 11.08 4.03 11.08 4.03 21.55 23.97 21.55 23.97 11.08"
      />
      <polygon
        fill={ALL_COLOR.AntiqueBronze}
        className="cls-1"
        points="9.04 10.08 9.04 10.08 10.44 6.42 6.93 6.42 4.19 10.08 9.04 10.08"
      />
      <path d="M25,10.09h0L21.65,5.42H6.35L3,10.08H3V22.55H25V10.1h0ZM17.4,6.42h3.68l2.73,3.66h-5Zm.34,3.66H10.11l1.4-3.66h4.82Zm-7.3-3.66L9,10.08H4.19L6.93,6.42ZM4,11.08H9v1.23h1V11.08h7.83v1.23h1l0-1.23H24V21.55H4Z" />
      <path d="M13,18.39c0-.35,0-.79,0-1.2h0C13,17.6,13,18,13,18.39Z" />
      <path
        fill={ALL_COLOR.WalnutBrown}
        className="cls-2"
        d="M14,16.24a.23.23,0,0,1,0,.19.17.17,0,0,1-.12.09h-.83c0,.13,0,.29,0,.46h1a.67.67,0,0,0,.39-.12,1.1,1.1,0,0,0,.22-.21.66.66,0,0,0,.15-.43v-.43H13.6A2.11,2.11,0,0,1,14,16.24Z"
      />
      <path d="M13.33,15.84l0,0a.76.76,0,0,0-.2.45h.73A3,3,0,0,0,13.33,15.84Z" />
      <path d="M10,15.35a2.9,2.9,0,0,0,.74.41.28.28,0,0,1,.16.23v.22a.41.41,0,0,1-.07.26,5.89,5.89,0,0,0-.48,2.2c0,.87.2,1.17.27,1.24a13.23,13.23,0,0,0,1.56,0,1,1,0,0,0,.09-.31v-.09h.23v-.64h.22c0-.39,0-1.8.11-2.48a1,1,0,0,1,.31-.71.48.48,0,0,1,.33-.1h3.87V15h.25v-.25H18V14H10.92Z" />
      <path d="M17.44,13.75V13.5h-.2v.25H11.67V13.5h-.21v.25h-.65l0,.05-.95,1.47a.13.13,0,0,0,0,.12s.06.2.85.56a.07.07,0,0,1,0,.06l0,.22a.19.19,0,0,1,0,.12,6.19,6.19,0,0,0-.51,2.32c0,1.12.33,1.4.38,1.43h0l1.11,0a1.91,1.91,0,0,0,.58,0,.57.57,0,0,0,.18-.37h.26v-.65H13V19s0-.25,0-.59,0-.79,0-1.2h1a.82.82,0,0,0,.51-.17,1.2,1.2,0,0,0,.26-.24.87.87,0,0,0,.2-.56v-.43h2.64v-.62h.24v-.25h.37V13.75Zm-2.7,2.47a.66.66,0,0,1-.15.43,1.1,1.1,0,0,1-.22.21A.67.67,0,0,1,14,17H13c0-.17,0-.33,0-.46h.83a.17.17,0,0,0,.12-.09.23.23,0,0,0,0-.19,2.11,2.11,0,0,0-.43-.45h1.14Zm-1.64.09a.76.76,0,0,1,.2-.45l0,0a3,3,0,0,1,.5.47H13.1Zm4.9-1.6h-.37V15h-.25v.63H13.51a.48.48,0,0,0-.33.1,1,1,0,0,0-.31.71c-.07.68-.1,2.09-.11,2.48h-.22v.64h-.23v.09a1,1,0,0,1-.09.31,13.23,13.23,0,0,1-1.56,0c-.07-.07-.3-.37-.27-1.24a5.89,5.89,0,0,1,.48-2.2.41.41,0,0,0,.07-.26V16a.28.28,0,0,0-.16-.23,2.9,2.9,0,0,1-.74-.41l.9-1.39H18Z" />
    </svg>
  );
}
