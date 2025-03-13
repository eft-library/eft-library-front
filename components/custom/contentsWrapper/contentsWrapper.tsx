import { ReactNode } from "react";
// import AdBanner from "../adsense/adBanner";

interface ContentsWrapper {
  children: ReactNode;
  leftAdUse?: boolean;
}

export default function ContentsWrapper({ children }: ContentsWrapper) {
  return (
    <div className="bg-cover bg-Background flex items-center justify-center w-full min-h-screen">
      <div className="hidden xl:block fixed top-2/4 left-4 -translate-y-2/4 w-[250px] min-h-24 max-h-[600px]">
        {/* <AdBanner
          dataAdFormat={"vertical"}
          dataFullWidthResponsive={true}
          dataAdSlot="8601640289"
        /> */}
      </div>
      <div className="flex-1 flex-col max-w-[1300px] min-w-[300px] pt-14 mx-[10%] bg-Background justify-center z-10">
        <div className="flex flex-col justify-between items-center gap-6 my-10">
          {children}
        </div>
      </div>
      <div className="hidden xl:block fixed top-2/4 right-4 -translate-y-2/4 w-[250px] min-h-24 max-h-[600px]">
        {/* <AdBanner
          dataAdFormat={"vertical"}
          dataFullWidthResponsive={true}
          dataAdSlot="8601640289"
        /> */}
      </div>
    </div>
  );
}
