import type { StationSize } from "../assetTypes";

export default function IntelligenceCenter({
  color,
  width,
  height,
}: StationSize) {
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
        width="693"
        height="692"
        fill="url(#pattern0_487_750)"
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
        x1="11.7383"
        y1="647.625"
        x2="11.7383"
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
          id="pattern0_487_750"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_487_750"
            transform="matrix(0.015625 0 0 0.0156476 0 -0.000722543)"
          />
        </pattern>
        <image
          id="image0_487_750"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
