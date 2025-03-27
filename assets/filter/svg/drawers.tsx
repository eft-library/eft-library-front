import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function Drawers({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.StormyBlue}
        className="cls-1"
        d="M9.1,13.13h10V8.63H9.1ZM13,9.07H15.3v1H13Z"
      />
      <path
        fill={ALL_COLOR.StormyBlue}
        className="cls-1"
        d="M9.1,18.91h10V14.13H9.1ZM13,14.54H15.3v1H13Z"
      />
      <path
        fill={ALL_COLOR.StormyBlue}
        className="cls-1"
        d="M9.1,25h10V19.91H9.1ZM13,20.4H15.3v1H13Z"
      />
      <path
        fill={ALL_COLOR.StormyBlue}
        className="cls-1"
        d="M9.1,7.63h10V3H9.1ZM13,3.46H15.3v1H13Z"
      />
      <path d="M8.1,2V26h12V2Zm11,23H9.1V19.91h10Zm0-6.07H9.1V14.13h10Zm0-5.78H9.1V8.63h10Zm0-5.5H9.1V3h10Z" />
      <rect x="12.99" y="3.46" width="2.31" height="1" />
      <rect x="12.99" y="9.07" width="2.31" height="1" />
      <rect x="12.99" y="14.54" width="2.31" height="1" />
      <rect x="12.99" y="20.4" width="2.31" height="1" />
    </svg>
  );
}
