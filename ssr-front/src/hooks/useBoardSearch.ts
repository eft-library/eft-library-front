import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { fetchDataWithReturn } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { PostInfo } from "@/types/types";

export default function useBoardSearch(siteParam: string) {
  const pathname = usePathname();
  const param = useSearchParams();
  const [searchInfo, setSearchInfo] = useState({
    word: "",
    filter: "",
  });
  const [postInfo, setPostInfo] = useState<PostInfo>(null);

  const getApiEndpoint = (path: string) => {
    const basePathToApiMap = {
      "/board": "/api/board/all",
      "/board/issue": "/api/board/issue",
    };

    const dynamicPaths = [
      "/board/forum",
      "/board/arena",
      "/board/tip",
      "/board/question",
      "/board/pvp",
      "/board/pve",
      "/board/notice",
    ];

    if (basePathToApiMap[path]) {
      return basePathToApiMap[path];
    }

    for (const dynamicPath of dynamicPaths) {
      if (path.startsWith(dynamicPath)) {
        const issueSuffix = "/issue";
        if (path.endsWith(issueSuffix)) {
          return `/api/board/${dynamicPath.split("/").pop()}/issue`;
        }
        return `/api/board/${dynamicPath.split("/").pop()}`;
      }
    }

    return null;
  };

  const getBoardPage = async (page: number) => {
    let result = null;
    const url = getApiEndpoint(pathname);

    if (siteParam === "board") {
      result = await fetchDataWithReturn(
        `${process.env.NEXT_PUBLIC_API_URL}${url}?page=${page}&page_size=10`
      );
    } else {
      result = await fetchDataWithReturn(
        `${process.env.NEXT_PUBLIC_API_URL}${url}?page=${page}&page_size=10`
      );
    }
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

  const getFilterPage = async () => {
    if (searchInfo.filter.length < 1) {
      alert("필터를 선택해주세요");
    } else if (searchInfo.word.length < 1) {
      alert("검색어를 입력해주세요");
    }
    // const result = await fetchDataWithReturn(
    //   `${API_ENDPOINTS.GET_BOARD_BY_TYPE}/${siteParam}?word=${searchInfo.word}&filter=${searchInfo.filter}&page=1&page_size=10`
    // );
    // setPostInfo(result);
  };

  return {
    searchInfo,
    postInfo,
    setSearchData,
    getFilterPage,
  };
}
