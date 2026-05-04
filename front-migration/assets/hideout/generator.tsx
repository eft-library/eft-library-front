import type { StationSize } from "../assetTypes";

export default function Generator({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="37.69 53.22 47.58 53.22 43.15 68.19 62.07 45.98 51.81 45.98 57.46 29.69 37.69 53.22" />
      <rect x="25.65" y="48.42" width="7.91" height="3.96" />
      <rect x="67.62" y="48.42" width="7.91" height="3.96" />
      <rect
        x="32.39"
        y="33.12"
        width="3.96"
        height="7.91"
        transform="translate(-16.09 40.09) rotate(-50.58)"
      />
      <rect
        x="64.82"
        y="59.77"
        width="3.96"
        height="7.91"
        transform="translate(-24.84 74.87) rotate(-50.58)"
      />
      <rect
        x="30.21"
        y="61.48"
        width="7.91"
        height="3.96"
        transform="translate(-32.08 35.06) rotate(-38.5)"
      />
      <rect
        x="63.06"
        y="35.36"
        width="7.91"
        height="3.96"
        transform="translate(-8.67 49.83) rotate(-38.5)"
      />
      <path d="M49.88,3,10.1,26V71.91l39.78,23,39.79-23V26ZM84.94,69.18,49.88,89.42,14.83,69.18V28.7L49.88,8.46,84.94,28.7Z" />
    </svg>
  );
}
