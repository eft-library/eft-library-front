import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { SVG } from "@/types/types";

export default function AmmoBox({ color, width, height, opacity, x, y }: SVG) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      x={x ? x : "0px"}
      y={y ? y : "0px"}
      width={width ? width : "20px"}
      height={height ? height : "20px"}
      opacity={opacity ? opacity : "1"}
      viewBox="0 0 28 28"
    >
      <polygon
        className="cls-1"
        fill={ALL_COLOR.AMMO_ONE}
        points="23.81 10.09 21.08 6.42 17.4 6.42 18.81 10.08 18.81 10.09 23.81 10.09"
      />
      <polygon
        className="cls-1"
        fill={ALL_COLOR.AMMO_ONE}
        points="11.51 6.42 10.11 10.09 17.74 10.09 16.33 6.42 13.93 6.42 11.51 6.42"
      />
      <polygon
        className="cls-2"
        fill={ALL_COLOR.AMMO_TWO}
        points="23.97 11.09 18.82 11.09 18.84 12.31 17.84 12.31 17.84 11.09 10.01 11.09 10.01 12.31 9.01 12.31 9.02 11.09 4.03 11.09 4.03 21.56 23.97 21.56 23.97 11.09"
      />
      <polygon
        className="cls-1"
        fill={ALL_COLOR.AMMO_ONE}
        points="9.04 10.09 9.04 10.08 10.44 6.42 6.92 6.42 4.19 10.09 9.04 10.09"
      />
      <path d="M25,10.1h0L21.65,5.42H6.35L3,10.09H3V22.56H25V10.1ZM17.4,6.42h3.68l2.73,3.67h-5Zm.34,3.67H10.11l1.4-3.67h4.82Zm-7.3-3.67L9,10.08H4.19L6.92,6.42ZM4,11.09H9v1.22h1V11.09h7.83v1.22h1l0-1.22H24V21.56H4Z" />
      <polygon
        className="cls-3"
        fill={ALL_COLOR.AMMO_THREE}
        points="11.9 15.38 10.32 15.38 10.32 15.38 11.9 15.38 11.9 15.38"
      />
      <path d="M12.29,19.33h0a32.84,32.84,0,0,0-.25-3.86,1.72,1.72,0,0,1-.87.23,2.35,2.35,0,0,1-1-.22,30.58,30.58,0,0,0-.25,3.84h2.35Z" />
      <path d="M12,15.33c-.18-1.22-.47-2.15-.91-2.15s-.73.9-.91,2.15l.11.05H11.9A.69.69,0,0,0,12,15.33Z" />
      <path d="M11.9,15.38H10.32A2,2,0,0,0,11.9,15.38Z" />
      <path d="M10,19.58a0,0,0,0,0,0,0V20s0,0,0,0h2.29a0,0,0,0,0,0,0v-.42a0,0,0,0,0,0,0Z" />
      <path
        className="cls-4"
        fill={ALL_COLOR.AMMO_FOUR}
        d="M12.32,19.46a.11.11,0,0,0,.07,0,.08.08,0,0,0,0-.08c0-1.06-.09-6.31-1.29-6.31s-1.29,4.8-1.3,6.28a.15.15,0,0,0,.12.14.16.16,0,0,0-.12.16V20a.17.17,0,0,0,.15.18h2.29a.17.17,0,0,0,.16-.18v-.42A.18.18,0,0,0,12.32,19.46Zm0,.58a0,0,0,0,1,0,0H10s0,0,0,0v-.42a0,0,0,0,1,0,0h2.29a0,0,0,0,1,0,0Zm-2-4.66-.11-.05c.18-1.25.48-2.15.91-2.15s.73.93.91,2.15a.69.69,0,0,1-.13.05h0a2,2,0,0,1-1.58,0Zm-.13.1a2.35,2.35,0,0,0,1,.22,1.72,1.72,0,0,0,.87-.23,32.84,32.84,0,0,1,.25,3.86H9.94A30.58,30.58,0,0,1,10.19,15.48Z"
      />
      <polygon
        className="cls-3"
        fill={ALL_COLOR.AMMO_THREE}
        points="14.65 15.38 13.07 15.38 13.07 15.38 14.65 15.38 14.65 15.38"
      />
      <path d="M15,19.33h0a30.82,30.82,0,0,0-.25-3.86,1.7,1.7,0,0,1-.87.23,2.4,2.4,0,0,1-1-.22,30.66,30.66,0,0,0-.24,3.84H15Z" />
      <path d="M14.78,15.33c-.18-1.22-.46-2.15-.91-2.15s-.72.9-.91,2.15l.11.05h1.58A.5.5,0,0,0,14.78,15.33Z" />
      <path d="M14.65,15.38H13.07A2,2,0,0,0,14.65,15.38Z" />
      <path d="M12.73,19.58s0,0,0,0V20s0,0,0,0H15s0,0,0,0v-.42s0,0,0,0Z" />
      <path
        className="cls-4"
        fill={ALL_COLOR.AMMO_FOUR}
        d="M15.07,19.46a.09.09,0,0,0,.07,0,.11.11,0,0,0,0-.08c0-1.06-.1-6.31-1.3-6.31s-1.28,4.8-1.29,6.28a.15.15,0,0,0,.11.14.17.17,0,0,0-.11.16V20a.17.17,0,0,0,.15.18H15a.17.17,0,0,0,.15-.18v-.42A.17.17,0,0,0,15.07,19.46Zm0,.58s0,0,0,0H12.73s0,0,0,0v-.42s0,0,0,0H15s0,0,0,0Zm-2-4.66L13,15.33c.19-1.25.48-2.15.91-2.15s.73.93.91,2.15a.5.5,0,0,1-.13.05h0a2,2,0,0,1-1.58,0Zm-.13.1a2.4,2.4,0,0,0,1,.22,1.7,1.7,0,0,0,.87-.23,30.82,30.82,0,0,1,.25,3.86H12.7A30.66,30.66,0,0,1,12.94,15.48Z"
      />
      <polygon
        className="cls-3"
        fill={ALL_COLOR.AMMO_THREE}
        points="17.5 15.38 15.93 15.38 15.93 15.38 17.5 15.38 17.5 15.38"
      />
      <path d="M17.9,19.33h0a30.74,30.74,0,0,0-.24-3.86,1.76,1.76,0,0,1-.88.23,2.44,2.44,0,0,1-1-.22,32.68,32.68,0,0,0-.24,3.84H17.9Z" />
      <path d="M17.64,15.33c-.18-1.22-.47-2.15-.92-2.15s-.72.9-.91,2.15l.12.05H17.5A.78.78,0,0,0,17.64,15.33Z" />
      <path d="M17.5,15.38H15.93A2,2,0,0,0,17.5,15.38Z" />
      <path d="M15.58,19.58s0,0,0,0V20s0,0,0,0h2.29s0,0,0,0v-.42s0,0,0,0Z" />
      <path
        className="cls-4"
        fill={ALL_COLOR.AMMO_FOUR}
        d="M17.92,19.46a.08.08,0,0,0,.07,0,.11.11,0,0,0,0-.08c0-1.06-.09-6.31-1.3-6.31s-1.28,4.8-1.29,6.28a.15.15,0,0,0,.11.14.17.17,0,0,0-.11.16V20a.17.17,0,0,0,.15.18h2.29A.17.17,0,0,0,18,20v-.42A.17.17,0,0,0,17.92,19.46Zm0,.58s0,0,0,0H15.58s0,0,0,0v-.42s0,0,0,0h2.29s0,0,0,0Zm-2-4.66-.12-.05c.19-1.25.48-2.15.91-2.15s.74.93.92,2.15a.78.78,0,0,1-.14.05h0a2,2,0,0,1-1.57,0Zm-.14.1a2.44,2.44,0,0,0,1,.22,1.76,1.76,0,0,0,.88-.23,30.74,30.74,0,0,1,.24,3.86H15.55A32.68,32.68,0,0,1,15.79,15.48Z"
      />
    </svg>
  );
}
