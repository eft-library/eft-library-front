import type { StationSize } from "../assetTypes";

export default function Roadmap({ color, width, height }: StationSize) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={width}
      height={height}
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="8"
        width="12"
        height="8"
        rx="2"
        stroke="#CFE8FF"
        stroke-width="2"
      ></rect>
      <rect
        x="26"
        y="20"
        width="12"
        height="8"
        rx="2"
        stroke="#CFE8FF"
        stroke-width="2"
      ></rect>
      <rect
        x="10"
        y="32"
        width="12"
        height="8"
        rx="2"
        stroke="#CFE8FF"
        stroke-width="2"
      ></rect>
      <path
        d="M22 12H26V24"
        stroke="#CFE8FF"
        stroke-width="2"
        stroke-linecap="round"
      ></path>
      <path
        d="M26 24H22V36"
        stroke="#CFE8FF"
        stroke-width="2"
        stroke-linecap="round"
      ></path>
    </svg>
  );
}
