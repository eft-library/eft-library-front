import type { Size } from "../assetTypes";

export default function Chzzk({ width, height }: Size) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect width={width} height={height} fill="#000" rx="9" />
      <path
        fill="#00FFA3"
        d="M24.106 24.664v-4.782H16.92l7.911-10.915h-6.41l1.94-2.678h-6.41L8.653 13.6h6.41l-8.02 11.065h17.063Z"
      />
    </svg>
  );
}
