import type { TopNaviLogo } from "@/types/types";

export default function TopNaviLogi({ color }: TopNaviLogo) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={600}
      height={56}
      viewBox="0 0 64.9 34.8"
    >
      <rect
        className="cls-1"
        x="-0.01"
        width="64.9"
        height="34.8"
        fill="none"
      />
      <path
        className="cls-2"
        fill={color}
        d="M18.89,4.74H2.7A.75.75,0,0,0,2,5.5v.89a.74.74,0,0,0,.75.75H7.78V28.73a1.5,1.5,0,0,0,1.5,1.5h3a1.5,1.5,0,0,0,1.5-1.5V7.14h5.08a.75.75,0,0,0,.76-.75V5.5A.76.76,0,0,0,18.89,4.74Z"
      />
      <rect
        className="cls-2"
        fill={color}
        x="45.92"
        y="4.74"
        width="6.03"
        height="25.49"
        rx="1.14"
      />
      <path
        className="cls-2"
        fill={color}
        d="M62.24,24.77H61.13a.74.74,0,0,0-.74.75v2.12h-5.7a.75.75,0,0,0-.75.75v1.09a.75.75,0,0,0,.75.75h7.55a.74.74,0,0,0,.74-.74h0v-4A.75.75,0,0,0,62.24,24.77Z"
      />
      <path
        className="cls-2"
        fill={color}
        d="M39.91,4.74h-1.4a1,1,0,0,0-.77.38l-7,9.15V5.87a1.13,1.13,0,0,0-1.13-1.13H25.82a1.14,1.14,0,0,0-1.13,1.13V29.1a1.13,1.13,0,0,0,1.13,1.13h3.77a1.12,1.12,0,0,0,1.13-1.13V19.43a.23.23,0,0,0,.07-.07L40.68,6.28A1,1,0,0,0,39.91,4.74Z"
      />
      <path
        className="cls-2"
        fill={color}
        d="M41.82,30.23H39.61a.58.58,0,0,1-.51-.31l-5.76-11.2a.57.57,0,0,1,0-.6l1.24-1.66a.56.56,0,0,1,.95.07L42.32,29.4A.56.56,0,0,1,41.82,30.23Z"
      />
    </svg>
  );
}
