import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchDataWithReturn } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { PostData } from "@/types/types";

export default function useBoardDetail(siteParam: string) {
  const param = useParams<{ id: string }>();
  const [postInfo, setPostInfo] = useState<PostData>(null);

  const getBoardPage = async () => {
    const result = await fetchDataWithReturn(
      `${API_ENDPOINTS.GET_BOARD_BY_TYPE}/${siteParam}/detail?board_id=${param.id}`
    );
    setPostInfo(result);
  };

  useEffect(() => {
    getBoardPage();
  }, [param]);

  return {
    postInfo,
  };
}
