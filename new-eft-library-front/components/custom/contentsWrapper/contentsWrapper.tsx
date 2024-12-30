import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ContentsWrapper {
  children: ReactNode;
  leftAdUse?: boolean;
}

export default function ContentsWrapper({ children }: ContentsWrapper) {
  return (
    <div>
      {children}
      <Button size={"lg"}>asd</Button>
    </div>
  );
}
