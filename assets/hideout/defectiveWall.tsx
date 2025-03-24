import type { StationSize } from "../assetTypes";

export default function DefectiveWall({ color, width, height }: StationSize) {
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
        y="87"
        width="692"
        height="692"
        fill="url(#pattern0_487_696)"
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
        x1="11.7393"
        y1="647.625"
        x2="11.7392"
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
          id="pattern0_487_696"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_487_696" transform="scale(0.015625)" />
        </pattern>
        <image
          id="image0_487_696"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
