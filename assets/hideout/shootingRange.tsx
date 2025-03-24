import type { StationSize } from "../assetTypes";

export default function ShootingRange({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 751 863"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="30.293"
        y="86"
        width="692"
        height="692"
        fill="url(#pattern0_487_678)"
      />
      <line
        x1="371.156"
        y1="853.38"
        x2="744.792"
        y2="637.661"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="382.136"
        y1="9.52628"
        x2="8.49997"
        y2="225.245"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="739.261"
        y1="647.625"
        x2="739.261"
        y2="216.188"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="11.7388"
        y1="647.625"
        x2="11.7388"
        y2="216.188"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="8.5"
        y1="637.661"
        x2="382.136"
        y2="853.38"
        stroke={color}
        strokeWidth="22"
      />
      <line
        x1="744.792"
        y1="225.245"
        x2="371.156"
        y2="9.5263"
        stroke={color}
        strokeWidth="22"
      />
      <defs>
        <pattern
          id="pattern0_487_678"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_487_678" transform="scale(0.015625)" />
        </pattern>
        <image
          id="image0_487_678"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
