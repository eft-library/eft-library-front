import type { StationSize } from "../assetTypes";

export default function Roadmap({ color, width, height }: StationSize) {
  return (
    <svg
      id="레이어_1"
      data-name="레이어 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36.85 36.85"
      width={width}
      height={height}
    >
      <title>1dd</title>
      <rect
        className="cls-1"
        x="5.3"
        y="2.68"
        width="12"
        height="8"
        rx="2"
        ry="2"
        stroke="#cee4f6"
        fill="none"
        strokeWidth="2px"
      />
      <rect
        className="cls-1"
        x="21.3"
        y="14.68"
        width="12"
        height="8"
        rx="2"
        ry="2"
        stroke="#cee4f6"
        fill="none"
        strokeWidth="2px"
      />
      <rect
        className="cls-1"
        x="5.3"
        y="26.68"
        width="12"
        height="8"
        rx="2"
        ry="2"
        stroke="#cee4f6"
        fill="none"
        strokeWidth="2px"
      />
      <path
        className="cls-2"
        d="M17.3,6.68h4v12"
        strokeLinecap="round"
        stroke="#cee4f6"
        fill="none"
        strokeWidth="2px"
      />
      <path
        className="cls-2"
        d="M21.3,18.68h-4v12"
        strokeLinecap="round"
        stroke="#cee4f6"
        fill="none"
        strokeWidth="2px"
      />
    </svg>
  );
}
