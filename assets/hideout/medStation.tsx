import type { StationSize } from "../assetTypes";

export default function MedStation({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="46.12 31.91 46.12 41.93 37.44 36.92 33.39 43.93 42.14 48.98 33.44 54.13 37.56 61.09 46.12 56.03 46.12 65.98 54.21 65.98 54.21 55.95 62.89 60.96 66.94 53.95 58.19 48.9 66.89 43.76 62.77 36.79 54.21 41.85 54.21 31.91 46.12 31.91" />
      <path d="M49.88,3,10.1,26V71.91l39.78,23,39.79-23V26ZM84.94,69.18,49.88,89.42,14.83,69.18V28.7L49.88,8.46,84.94,28.7Z" />
    </svg>
  );
}
