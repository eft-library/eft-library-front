import type { StationSize } from "../assetTypes";

export default function DefectiveWall({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M49.25,3,9.47,26V71.94l39.78,23L89,71.94V26ZM84.31,69.21,49.25,89.44l-35-20.23V28.73L49.25,8.49,84.31,28.73Z" />
      <rect x="43.14" y="28.88" width="12.23" height="7.91" />
      <rect x="57.35" y="28.88" width="11.99" height="7.91" />
      <rect x="29.17" y="50.06" width="12.42" height="7.91" />
      <rect x="57.35" y="50.06" width="11.99" height="7.91" />
      <rect x="50.32" y="38.97" width="19.02" height="8.9" />
      <rect x="29.17" y="60.15" width="19.18" height="8.9" />
      <polygon points="29.16 29.96 29.16 36.78 36.13 36.78 29.16 29.96" />
      <polygon points="40.08 34.85 40.84 36.78 41.59 36.78 41.59 28.88 33.45 28.88 38.48 35.61 40.08 34.85" />
      <polygon points="33.97 44.55 34.46 42.36 38.06 44.55 37.32 38.97 29.16 38.97 29.16 47.87 38.75 47.87 33.97 44.55" />
      <polygon points="40.6 44.02 47.13 47.87 48.34 47.87 48.34 38.97 40.42 38.97 40.6 44.02" />
      <polygon points="54.26 50.06 46.28 50.06 50.32 53.62 54.26 50.06" />
      <polygon points="53.41 57.97 55.37 57.97 55.37 52.74 52 55.67 53.41 57.97" />
      <polygon points="50.32 67.84 54.58 67.84 55.37 65.27 50.32 61.14 50.32 67.84" />
      <polygon points="60.54 62.27 59.83 66.15 57.12 65.66 57.35 67.98 69.35 67.98 69.35 65.9 63.35 62.69 60.54 62.27" />
      <polygon points="69.35 63.18 69.35 60.15 64.81 60.15 69.35 63.18" />
    </svg>
  );
}
