import HighlightCard from "@/components/ui/HighlightCard";

export default function Home() {
  const posts = [
    { id: "1", title: "1" },
    { id: "2", title: "2" },
    { id: "3", title: "3" },
  ];

  return (
    <div className="">
      <HighlightCard sectionTitle="테스트" posts={posts} />
    </div>
  );
}
