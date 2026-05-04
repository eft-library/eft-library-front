import type { StationSize } from "../assetTypes";

export default function SolarPower({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="48.41" y="24.39" width="3.58" height="7.06" />
      <rect x="48.09" y="49.55" width="3.58" height="7.06" />
      <rect
        x="38.87"
        y="27.46"
        width="3.58"
        height="7.06"
        transform="translate(-9.9 38.6) rotate(-45.88)"
      />
      <rect
        x="57.37"
        y="45.41"
        width="3.58"
        height="7.06"
        transform="translate(-17.16 57.33) rotate(-45.87)"
      />
      <rect x="33.87" y="38.5" width="7.06" height="3.58" />
      <rect x="59.16" y="38.5" width="7.06" height="3.58" />
      <rect
        x="37.66"
        y="47.84"
        width="7.06"
        height="3.58"
        transform="translate(-23.11 44.65) rotate(-45.88)"
      />
      <rect
        x="55.36"
        y="29.59"
        width="7.06"
        height="3.58"
        transform="translate(-4.63 51.81) rotate(-45.88)"
      />
      <path d="M42.61,40a7.32,7.32,0,1,0,7.32-7.32A7.31,7.31,0,0,0,42.61,40ZM53.8,40a3.88,3.88,0,1,1-3.87-3.88A3.87,3.87,0,0,1,53.8,40Z" />
      <polygon points="49.88 59.37 33.18 59.37 36.57 64.46 49.88 64.46 49.93 64.46 63.24 64.46 66.63 59.37 49.93 59.37 49.88 59.37" />
      <polygon points="49.88 67.63 37.4 67.63 40.78 72.72 49.88 72.72 49.93 72.72 59.03 72.72 62.41 67.63 49.93 67.63 49.88 67.63" />
      <path d="M49.88,3,10.1,26V71.91l39.78,23,39.79-23V26ZM84.94,69.18,49.88,89.42,14.83,69.18V28.7L49.88,8.46,84.94,28.7Z" />
    </svg>
  );
}
