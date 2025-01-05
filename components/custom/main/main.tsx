import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import Search from "@/components/custom/main/search/search";
import NavItem from "@/components/custom/main/navItem/navItem";
import News from "@/components/custom/main/news/news";
import MapSlider from "@/components/custom/main/mapSlider/mapSlider";

export default function Main() {
  return (
    <ContentsWrapper>
      <Search />
      <News />
      <MapSlider />
      <NavItem />
    </ContentsWrapper>
  );
}
