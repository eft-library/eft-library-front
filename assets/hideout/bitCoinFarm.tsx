import type { StationSize } from "../assetTypes";

export default function BitCoinFarm({ color, width, height }: StationSize) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 751 863"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="29.293"
        y="98"
        width="692"
        height="693"
        fill="url(#pattern0_487_786)"
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
          id="pattern0_487_786"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_487_786"
            transform="matrix(0.0156476 0 0 0.015625 -0.000722543 0)"
          />
        </pattern>
        <image
          id="image0_487_786"
          width="64"
          height="64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
