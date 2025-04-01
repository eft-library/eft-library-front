import type { StationSize } from "../assetTypes";

export default function Illumination({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="32.59" y="47.26" width="7.06" height="3.58" />
      <rect x="61.86" y="47.26" width="7.06" height="3.58" />
      <rect x="48.69" y="33.01" width="3.58" height="7.06" />
      <rect
        x="57.39"
        y="38.28"
        width="7.06"
        height="3.58"
        transform="translate(-10.49 54.81) rotate(-45)"
      />
      <rect
        x="38.09"
        y="36.06"
        width="3.58"
        height="7.06"
        transform="translate(-16.32 39.8) rotate(-45)"
      />
      <rect
        x="34.37"
        y="57.32"
        width="7.06"
        height="3.58"
        transform="translate(-29.08 38.02) rotate(-39.86)"
      />
      <rect
        x="61.15"
        y="55.58"
        width="3.58"
        height="7.06"
        transform="translate(-22.77 69.54) rotate(-50.15)"
      />
      <path d="M50.48,3.11l-39.79,23V72L50.48,95,90.26,72V26.08ZM85.53,69.29,50.48,89.53,15.42,69.29V28.81L50.48,8.57,85.53,28.81Z" />
    </svg>
  );
}
