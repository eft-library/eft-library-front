import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchDataWithReturn } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";

export default function useBoardSearch(siteParam: string) {
  const param = useSearchParams();
  const [searchInfo, setSearchInfo] = useState({
    word: "",
    filter: "",
  });
  const [postInfo, setPostInfo] = useState(null);

  const getBoardPage = async (page) => {
    const result = await fetchDataWithReturn(
      `${API_ENDPOINTS.GET_BOARD_BY_TYPE}/${siteParam}?page=${page}&page_size=10`
    );
    setPostInfo(result);
  };

  useEffect(() => {
    getBoardPage(Number(param.get("id")));
  }, [param]);

  const setSearchData = (e, val) => {
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
    console.log(searchInfo);
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
