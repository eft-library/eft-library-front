import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import Search from "@/components/custom/main/search/search";
import NavItem from "@/components/custom/main/navItem/navItem";
import News from "@/components/custom/main/news/news";
import MapSlider from "@/components/custom/main/mapSlider/mapSlider";

export default function Main() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <Search />
        <News />
        <MapSlider />
        <NavItem />
      </div>
    </ContentsWrapper>
  );
}
