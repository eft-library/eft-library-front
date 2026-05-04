import type { StationSize } from "../assetTypes";

export default function Gym({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M48.26,3,8.47,26V71.91l39.79,23L88,71.91V26ZM83.31,69.18,48.26,89.42,13.2,69.18V28.7L48.26,8.46,83.31,28.7Z" />
      <path d="M47.19,35.17l5.71,5.72L40.25,53.54l-5.72-5.72a1.8,1.8,0,0,0-2.53,0l-1.59,1.6a1.79,1.79,0,0,0,0,2.53L45.26,66.8a1.79,1.79,0,0,0,2.53,0l1.59-1.6a1.79,1.79,0,0,0,0-2.53l-5-5L57,45l5,5a1.79,1.79,0,0,0,2.53,0l1.6-1.6a1.79,1.79,0,0,0,0-2.53L51.31,31.05a1.79,1.79,0,0,0-2.53,0l-1.59,1.59A1.79,1.79,0,0,0,47.19,35.17Z" />
      <rect
        x="32.35"
        y="53.73"
        width="5.84"
        height="16.4"
        rx="1.82"
        transform="translate(-33.46 43.08) rotate(-45)"
      />
      <rect
        x="58.33"
        y="27.75"
        width="5.84"
        height="16.4"
        rx="1.82"
        transform="translate(-7.48 53.84) rotate(-45)"
      />
      <rect
        x="31.67"
        y="63.31"
        width="1.91"
        height="3.95"
        rx="0.83"
        transform="translate(-36.6 42.17) rotate(-44.98)"
      />
      <rect
        x="63.71"
        y="31.27"
        width="1.91"
        height="3.95"
        rx="0.83"
        transform="translate(-4.57 55.46) rotate(-45)"
      />
    </svg>
  );
}
