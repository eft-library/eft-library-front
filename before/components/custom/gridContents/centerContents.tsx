import { cn } from "@/lib/utils";

interface CenterContents {
  isCol?: boolean;
  children: React.ReactNode;
  colSpan?: string;
}

export default function CenterContents({
  children,
  isCol = false,
  colSpan = "1",
}: CenterContents) {
  return (
    <div
      className={cn(
        `flex justify-center items-center ${
          isCol && "flex-col"
        } col-span-${colSpan}`
      )}
    >
      {children}
    </div>
  );
}
