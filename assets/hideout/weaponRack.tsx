import type { StationSize } from "../assetTypes";

export default function WeaponRack({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 751 863"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="43.293"
        y="84"
        width="692"
        height="693"
        fill="url(#pattern0_487_795)"
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
          id="pattern0_487_795"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_487_795"
            transform="matrix(0.0156476 0 0 0.015625 -0.000722543 0)"
          />
        </pattern>
        <image
          id="image0_487_795"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
