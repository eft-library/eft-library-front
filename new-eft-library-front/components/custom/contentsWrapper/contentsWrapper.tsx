import { ReactNode } from "react";

interface ContentsWrapper {
  children: ReactNode;
  leftAdUse?: boolean;
}

export default function ContentsWrapper({ children }: ContentsWrapper) {
  return <div>{children}</div>;
}
