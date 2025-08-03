import type { ViewWrapperTypes } from "./view-wrapper.types";
import AdBanner from "../Adsense/ad-banner";

export default function ViewWrapper({ children }: ViewWrapperTypes) {
  return (
    <div className="min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-gray-900 relative">
      {/* 왼쪽 광고 */}
      <aside className="hidden 2xl:block fixed top-1/2 left-4 z-[9999] -translate-y-1/2">
        <div className="sticky top-20">
          <div className="w-[180px] h-[620px] flex items-center justify-center">
            <AdBanner
              dataAdFormat={"vertical"}
              dataFullWidthResponsive={true}
              dataAdSlot="8601640289"
              style={{ width: "160px", height: "600px" }}
              maxWidth={600}
            />
          </div>
        </div>
      </aside>

      {/* 오른쪽 광고 */}
      <aside className="hidden 2xl:block fixed top-1/2 right-4 z-[9999] -translate-y-1/2">
        <div className="sticky top-20">
          <div className="w-[180px] h-[620px] flex items-center justify-center">
            <AdBanner
              dataAdFormat={"vertical"}
              dataFullWidthResponsive={true}
              dataAdSlot="8601640289"
              style={{ width: "160px", height: "600px" }}
              maxWidth={600}
            />
          </div>
        </div>
      </aside>

      {children}
    </div>
  );
}
