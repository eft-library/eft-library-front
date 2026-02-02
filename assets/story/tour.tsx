import type { StationSize } from "../assetTypes";

export default function Tour({ color, width, height }: StationSize) {
  return (
    <svg
      id="레이어_1"
      data-name="레이어 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36.85 36.85"
      width={width}
      height={height}
      fill={color}
    >
      <title>대지 2 사본 8</title>
      <path
        className="cls-1"
        d="M25.43,22.47l10.43-4.19L24.71,13.64l3.08-4.45-5.17,2.25L18.49.86l-4.67,11L9.35,9.06l2.26,5L1,18.28l11.15,4.95L9,27.65l5.25-2.3L18.74,36l4.72-11.2L27.79,28Zm5.47-4.15L24.72,20.8l-1.9-4.43.76-1.09Zm-9,0A3.33,3.33,0,1,1,18.54,15,3.33,3.33,0,0,1,21.87,18.31ZM18.47,5.86l2.46,6.31L17,13.87l-1.53-1ZM6,18.32l6.43-2.55,2,4.38-1,1.44ZM18.65,31l-2.73-6.4,4.56-2,1.3,1Z"
      />
      <path
        className="cls-1"
        d="M18.54,16.65a1.67,1.67,0,1,0,1.66,1.66A1.66,1.66,0,0,0,18.54,16.65Z"
      />
    </svg>
  );
}
