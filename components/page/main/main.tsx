import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import Search from "@/components/page/main/search/search";
import NavItem from "@/components/page/main/navItem/navItem";
import News from "@/components/page/main/news/news";
import MainSlider from "@/components/page/main/mainSlider/mainSlider";

export default function Main() {
  return (
    <ContentsWrapper>
      <Search />
      <News />
      <MainSlider />
      <NavItem />
    </ContentsWrapper>
  );
}
