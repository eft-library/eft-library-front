import type { StationSize } from "../assetTypes";

export default function TheUnheard({ color, width, height }: StationSize) {
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
      <title>대지 2 사본 6</title>
      <polygon
        className="cls-1"
        points="11.25 20.52 18.5 4.11 13.58 4.11 4.21 25.4 16.54 25.4 18.96 20.52 11.25 20.52"
      />
      <polygon
        className="cls-1"
        points="20.31 11.23 17.89 16.11 25.6 16.11 18.35 32.52 23.27 32.52 32.64 11.23 20.31 11.23"
      />
    </svg>
  );
}
