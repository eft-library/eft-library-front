import Info from "@/app/contents/info";
import News from "@/app/contents/news/news";
import Search from "@/app/contents/search";
import Slider from "./contents/slider";
import PageParent from "@/components/pageParent/pageParent";

export default function App() {
  return (
    <PageParent>
      <Search />
      <News />
      <Slider />
      <Info />
    </PageParent>
  );
}
