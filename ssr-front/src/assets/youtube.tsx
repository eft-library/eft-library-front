import type { Size } from "@/types/types";

export default function Youtube({ width, height }: Size) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 121.485 85.039"
      width={width}
      height={height}
    >
      <path
        d="M118.946 13.279a15.213 15.213 0 0 0-10.74-10.74C98.732 0 60.742 0 60.742 0S22.753 0 13.279 2.539a15.213 15.213 0 0 0-10.74 10.74C0 22.753 0 42.52 0 42.52s0 19.766 2.539 29.24a15.214 15.214 0 0 0 10.74 10.74c9.474 2.538 47.463 2.538 47.463 2.538s37.99 0 47.464-2.538a15.214 15.214 0 0 0 10.74-10.741c2.539-9.474 2.539-29.24 2.539-29.24s0-19.766-2.539-29.24Z"
        fill="red"
      />
      <path d="M48.594 60.742 80.155 42.52 48.594 24.297v36.445z" fill="#fff" />
    </svg>
  );
}
