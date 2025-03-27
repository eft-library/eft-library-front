import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { SVG } from "@/assets/assetTypes";

export default function SupplyCrate({ width, height, opacity, x, y }: SVG) {
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
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="21.11 9.13 20.38 8.38 17 8.38 17.34 9.13 21.11 9.13"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="23.05 11.09 22.06 10.09 17.78 10.09 18.23 11.09 23.05 11.09"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="17.73 9.99 21.96 9.99 21.2 9.21 17.38 9.21 17.73 9.99"
      />
      <rect
        fill={ALL_COLOR.SeafoamBreeze}
        className="cls-2"
        x="4.46"
        y="13.42"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.SeafoamBreeze}
        className="cls-2"
        x="4.46"
        y="16.25"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.SeafoamBreeze}
        className="cls-2"
        x="4.46"
        y="14.84"
        width="19"
        height="1.31"
      />
      <rect
        fill={ALL_COLOR.SeafoamBreeze}
        className="cls-2"
        x="4.46"
        y="17.66"
        width="19"
        height="1.42"
      />
      <polygon
        fill={ALL_COLOR.SeafoamBreeze}
        className="cls-2"
        points="23.46 13.32 23.46 12.09 18.36 12.09 18.39 13.17 17.39 13.17 17.39 12.09 10.41 12.09 10.41 13.17 9.41 13.17 9.44 12.09 4.46 12.09 4.46 13.32 23.46 13.32"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="10.46 9.13 10.79 8.38 7.53 8.38 6.79 9.13 10.46 9.13"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="10.02 10.09 5.85 10.09 4.86 11.09 9.57 11.09 10.02 10.09"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="5.95 9.99 10.06 9.99 10.42 9.21 6.71 9.21 5.95 9.99"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="10.66 11.09 17.13 11.09 16.68 10.09 11.12 10.09 10.66 11.09"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="16.25 9.13 15.91 8.38 13.95 8.38 13.84 8.38 11.89 8.38 11.55 9.13 16.25 9.13"
      />
      <polygon
        fill={ALL_COLOR.MintWhisper}
        className="cls-1"
        points="11.16 9.99 16.64 9.99 16.28 9.21 11.52 9.21 11.16 9.99"
      />
      <path d="M20.8,7.38H7.11L3.46,11.09h0v9h21v-9h0ZM4.46,16.25h19v1.31h-19Zm19-.1h-19V14.84h19Zm-19-1.41V13.42h19v1.32Zm12.67-3.65H10.66l.46-1h5.56Zm-11.28-1H10l-.45,1H4.86ZM22,10H17.73l-.35-.78H21.2Zm-5.32,0H11.16l.36-.78h4.76Zm-6.57,0H6l.76-.78h3.71Zm12,.1,1,1H18.23l-.45-1ZM20.38,8.38l.73.75H17.34L17,8.38Zm-6.54,0h2.07l.33.75H11.55l.34-.75Zm-6.31,0h3.26l-.33.75H6.8Zm1.91,3.71,0,1.08h1V12.09h7v1.08h1l0-1.08h5.1v1.23h-19V12.09Zm-5,7V17.66h19v1.43Z" />
    </svg>
  );
}
