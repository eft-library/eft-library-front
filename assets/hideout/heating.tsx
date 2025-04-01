import type { StationSize } from "../assetTypes";

export default function Heating({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99.76 97.88"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="25.97" y="47.94" width="8.18" height="4.15" />
      <rect x="65.35" y="47.94" width="8.18" height="4.15" />
      <rect
        x="61.26"
        y="36.22"
        width="8.18"
        height="4.15"
        transform="translate(-7.94 57.43) rotate(-45)"
      />
      <rect
        x="32.08"
        y="33.94"
        width="4.15"
        height="8.18"
        transform="translate(-16.89 35.29) rotate(-45)"
      />
      <rect
        x="29.64"
        y="60.78"
        width="8.18"
        height="4.15"
        transform="translate(-32.44 36.22) rotate(-39.85)"
      />
      <rect
        x="63.54"
        y="58.76"
        width="4.15"
        height="8.18"
        transform="translate(-24.69 72.94) rotate(-50.14)"
      />
      <path d="M44.63,42.22C45.5,43.84,46.87,48,44,49c-1.87.68-3-2-3.52-3.92a.77.77,0,0,0-1.42-.16c-2,3.72-5.36,12.81,5.78,17.92A.78.78,0,0,0,46,62c-.17-1.7,0-4.6,2.53-6.15a.77.77,0,0,1,1.17.7c-.06,1.8.17,5,2.44,6.26l.67.18a3.37,3.37,0,0,0,2.74-.49c10.76-7.32,7-14.68,4.58-17.77a.77.77,0,0,0-1.37.36,5,5,0,0,1-2.45,3.68s.24-6.31-3.2-9.7c-2.24-2.2-1.87-5.79-1.41-7.87a.77.77,0,0,0-1.12-.84C47.52,32.08,41.48,36.34,44.63,42.22Z" />
      <path d="M49.88,3.23,10.1,26.2V72.14l39.78,23,39.79-23V26.2ZM84.94,69.41,49.88,89.64,14.83,69.41V28.93L49.88,8.69,84.94,28.93Z" />
    </svg>
  );
}
