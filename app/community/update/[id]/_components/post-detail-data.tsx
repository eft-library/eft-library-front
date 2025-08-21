"use client";

import { requestUserData } from "@/lib/config/api";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/custom/Loading/loading";
import CommunityWrite from "@/components/custom/Community/Write/write";
import { useParams, useRouter } from "next/navigation";

export default function PostDetailData() {
  const { data: session, status } = useSession();
  const [postInfo, setPostInfo] = useState();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const getPostDetail = async () => {
      const data = await requestUserData(
        COMMUNITY_ENDPOINTS.GET_UPDAET_POST_DETAIL,
        {
          post_id: id,
        },
        session
      );
      if (data && data.status === 200 && data.data) {
        setPostInfo(data.data);
      } else {
        console.error(
          "Failed to fetch station data:",
          data?.msg || "Unknown error"
        );
        router.push("/community/issue");
      }
    };
    getPostDetail();
  }, [status, session, id, router]);
  if (!postInfo) return <Loading />;

  return (
    <CommunityWrite
      postInfo={postInfo}
      writeType="update"
      pageTitle="글 수정"
    />
  );
}
