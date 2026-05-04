import type { StationSize } from "../assetTypes";

export default function BlueFire({ color, width, height }: StationSize) {
  return (
    <svg
      id="레이어_1"
      data-name="레이어 1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 36.85 36.85"
    >
      <title>대지 2 사본 2</title>
      <path
        className="cls-1"
        d="M14.83,26.35a11.23,11.23,0,0,1-2.14-1.55c-3.56,4.88,2.94,11.13,2.94,11.13s-16.25-9-6.75-21.13l6.75-7.25s2.88-3.25.31-6.62c0,0,9.88,2.62,8.07,17.18,0,0,2.5-.12,2.93-4.75,0,0,11.82,10.94-5.12,22.57,0,0,7.37-8.75.75-13.13l-2.5-1.87s-1.94-.75-.56-5.19c0,0-5.94,2.94-4.13,10.75Z"
      />
    </svg>
  );
}
