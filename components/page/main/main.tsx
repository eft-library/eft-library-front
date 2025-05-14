import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import Search from "@/components/page/main/search/search";
import NavItem from "@/components/page/main/navItem/navItem";
import News from "@/components/page/main/news/news";
import AdBanner from "@/components/custom/adsense/adBanner";

export default function Main() {
  return (
    <ContentsWrapper>
      <Search />
      <News />
      <div className="w-full flex items-center justify-center">
        <div className="w-[1200px]">
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
      </div>
      <NavItem />
    </ContentsWrapper>
  );
}
