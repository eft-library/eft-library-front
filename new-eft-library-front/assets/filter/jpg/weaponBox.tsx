import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { JPG } from "../../assetTypes";

export default function WeaponBox({ x, y, scale }: JPG) {
  return (
    <>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-1"
          fill={ALL_COLOR.WEAPON_BOX_ONE}
          points="23.81 10.24 21.08 6.58 17.4 6.58 18.81 10.24 18.81 10.24 23.81 10.24"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-1"
          fill={ALL_COLOR.WEAPON_BOX_ONE}
          points="11.51 6.58 10.11 10.24 17.74 10.24 16.33 6.58 13.93 6.58 11.51 6.58"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-2"
          fill={ALL_COLOR.WEAPON_BOX_TWO}
          points="23.97 11.24 18.82 11.24 18.84 12.47 17.84 12.47 17.84 11.24 10.01 11.24 10.01 12.47 9.01 12.47 9.02 11.24 4.03 11.24 4.03 21.71 23.97 21.71 23.97 11.24"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <polygon
          className="cls-1"
          fill={ALL_COLOR.WEAPON_BOX_ONE}
          points="9.04 10.24 9.04 10.24 10.44 6.58 6.92 6.58 4.19 10.24 9.04 10.24"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M25,10.25h0L21.65,5.57H6.35L3,10.24H3V22.71H25V10.26h0ZM17.4,6.57h3.68l2.73,3.67h-5Zm.34,3.67H10.11l1.4-3.67h4.82Zm-7.3-3.67L9,10.24H4.19L6.92,6.57ZM4,11.24H9v1.23h1V11.24h7.83v1.23h1l0-1.23H24V21.71H4Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M13,18.55c0-.35,0-.79,0-1.2h0C13,17.76,13,18.2,13,18.55Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path
          className="cls-2"
          fill={ALL_COLOR.WEAPON_BOX_TWO}
          d="M14,16.4a.23.23,0,0,1,0,.19.24.24,0,0,1-.12.09h-.83c0,.13,0,.29,0,.46H14a.68.68,0,0,0,.4-.12,1.1,1.1,0,0,0,.22-.21.66.66,0,0,0,.15-.43V16H13.59A2,2,0,0,1,14,16.4Z"
        />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M13.33,16l0,0a.7.7,0,0,0-.2.45h.73A3,3,0,0,0,13.33,16Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M10,15.51a2.9,2.9,0,0,0,.74.41.25.25,0,0,1,.15.23l0,.22a.41.41,0,0,1-.07.26,5.89,5.89,0,0,0-.48,2.2c0,.87.2,1.17.27,1.24a13.26,13.26,0,0,0,1.56,0,1.35,1.35,0,0,0,.09-.31v-.09h.23V19h.22c0-.39,0-1.8.11-2.48a1,1,0,0,1,.31-.71.46.46,0,0,1,.32-.1h3.88v-.63h.25v-.25H18v-.75H10.92C10.77,14.34,10.16,15.29,10,15.51Z" />
      </g>
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <path d="M17.44,13.91v-.25h-.2v.25H11.67v-.25h-.21v.25h-.65l0,.05-.95,1.47a.16.16,0,0,0,0,.12s.07.2.86.56a.07.07,0,0,1,0,.05v.23a.14.14,0,0,1,0,.12,6.19,6.19,0,0,0-.51,2.32c0,1.11.33,1.4.37,1.43h.06l1.11,0a1.91,1.91,0,0,0,.58,0,.57.57,0,0,0,.18-.38h.26v-.64H13v-.1s0-.25,0-.59,0-.79,0-1.2h1a.85.85,0,0,0,.52-.17,1.48,1.48,0,0,0,.26-.24.89.89,0,0,0,.2-.56V16h2.64v-.62h.24v-.25h.37V13.91Zm-2.7,2.47a.66.66,0,0,1-.15.43,1.1,1.1,0,0,1-.22.21.68.68,0,0,1-.4.12H13c0-.17,0-.33,0-.46h.83a.24.24,0,0,0,.12-.09.23.23,0,0,0,0-.19,2,2,0,0,0-.44-.45h1.15Zm-1.64.09a.7.7,0,0,1,.2-.45l0,0a3,3,0,0,1,.5.47H13.1Zm4.9-1.6h-.37v.25h-.25v.63H13.5a.46.46,0,0,0-.32.1,1,1,0,0,0-.31.71c-.07.68-.11,2.09-.11,2.48h-.22v.64h-.23v.09a1.35,1.35,0,0,1-.09.31,13.26,13.26,0,0,1-1.56,0c-.07-.07-.3-.37-.27-1.24a5.89,5.89,0,0,1,.48-2.2.41.41,0,0,0,.07-.26l0-.22a.25.25,0,0,0-.15-.23,2.9,2.9,0,0,1-.74-.41c.14-.22.75-1.17.9-1.39H18Z" />
      </g>
    </>
  );
}
