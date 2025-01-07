import { cn } from "@/lib/utils";

interface TextSpan {
  size?: string;
  textColor?: string;
  textWeight?: string;
  hoverColor?: string;
  isCenter?: boolean;
  isCursor?: boolean;
  children: React.ReactNode;
}

export default function TextSpan({
  size = "base",
  textColor = "white",
  hoverColor = "white",
  textWeight = "bold",
  isCenter = true,
  isCursor = false,
  children,
}: TextSpan) {
  return (
    <span
      className={cn(
        isCenter && "text-center",
        `font-${textWeight}`,
        `text-${size}`,
        textColor && `text-${textColor}`, // 수정된 부분
        isCursor && "cursor-pointer",
        hoverColor && `hover:text-${hoverColor}` // 수정된 부분
      )}
    >
      {children}
    </span>
  );
}
