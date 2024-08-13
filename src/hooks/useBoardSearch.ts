import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchDataWithReturn } from "@/lib/api";
import type { PostInfo } from "@/types/types";

export default function useBoardSearch(siteParam: string) {
  const pathname = usePathname();
  const param = useSearchParams();
  const [searchInfo, setSearchInfo] = useState({
    word: "",
    filter: "",
  });
  const router = useRouter();
  const [postInfo, setPostInfo] = useState<PostInfo>(null);

  const getBoardPage = async (page: number) => {
    const isIssue = pathname.includes("issue");
    let result = await fetchDataWithReturn(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/board/posts?page=${page}&page_size=10&type=${siteParam}&issue=${isIssue}&word=${param.get(
        "word"
      )}&search_type=${param.get("filter")}`
    );
    setPostInfo(result);
  };

  useEffect(() => {
    getBoardPage(Number(param.get("id")));
  }, [param]);

  const setSearchData = (e: any, val: string) => {
    setSearchInfo((prev) => ({
      ...prev,
      [val]: e.target.value,
    }));
  };

  const getFilterPage = () => {
    if (searchInfo.filter.length < 1) {
      alert("필터를 선택해주세요");
    } else if (searchInfo.word.length < 1) {
      alert("검색어를 입력해주세요");
    } else {
      router.push(
        `${pathname}?id=1&filter=${searchInfo.filter}&word=${searchInfo.word}`
      );
    }
  };

  return {
    searchInfo,
    postInfo,
    setSearchData,
    getFilterPage,
  };
}
