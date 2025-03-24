import type { StationSize } from "../assetTypes";

export default function NutritionUnit({ color, width, height }: StationSize) {
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
        height="693"
        fill="url(#pattern0_487_732)"
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
          id="pattern0_487_732"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_487_732"
            transform="matrix(0.0156476 0 0 0.015625 -0.000722543 0)"
          />
        </pattern>
        <image
          id="image0_487_732"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
