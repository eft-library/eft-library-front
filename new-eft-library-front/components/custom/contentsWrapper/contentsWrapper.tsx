import { ReactNode } from "react";

interface ContentsWrapper {
  children: ReactNode;
  leftAdUse?: boolean;
}

export default function ContentsWrapper({ children }: ContentsWrapper) {
  return (
    <div className="bg-cover bg-black flex items-center justify-center w-full min-h-screen">
      <div className="hidden xl:block fixed top-2/4 left-1 -translate-y-2/4 w-[10%] min-h-24 max-h-[600px]"></div>
      <div className="flex-1 flex-col max-w-[1300px] min-w-[300px] pt-14 mx-[10%] bg-black justify-center">
        {children}
      </div>
      <div className="hidden xl:block fixed top-2/4 right-1 -translate-y-2/4 w-[10%] min-h-24 max-h-[600px]"></div>
    </div>
  );
}
