import type { DurationBarTypes } from "../wipe.types";

export default function DurationBar({
  duration,
  maxDuration,
  isActive,
  isMobile = false,
}: DurationBarTypes) {
  const percentage = (duration / maxDuration) * 100;

  return (
    <div
      className={`flex items-center gap-3 ${
        isMobile ? "flex-col items-start gap-2" : ""
      }`}
    >
      <div
        className={`${
          isMobile ? "w-full" : "w-32"
        } h-3 bg-muted rounded-full overflow-hidden`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-blue-400 to-cyan-400"
              : "bg-gradient-to-r from-rose-400 to-pink-400"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span
        className={`text-sm font-medium ${
          isActive ? "text-cyan-400" : "text-orange-400"
        } ${isMobile ? "self-end" : ""}`}
      >
        {duration} Days
      </span>
    </div>
  );
}
