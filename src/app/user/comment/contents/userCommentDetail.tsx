"use client";

import UserPublicInfo from "@/components/userPublicInfo/userPublicInfo";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/endPoints";
import { useAppStore } from "@/store/provider";
import type { UserComment } from "@/types/types";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
import UserCommentAll from "@/components/userPublicInfo/userCommentAll";

export default function UserCommentDetail() {
  const param = useSearchParams();
  const { searchUser } = useAppStore((state) => state);
  const [info, setInfo] = useState<UserComment>();

  const getUserCommentInfo = async (page: number) => {
    try {
      const res = await fetch(
        `${API_ENDPOINTS.GET_USER_COMMENT_DETAIL}?page=${page}&page_size=10`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: searchUser,
          }),
        }
      );
      const response = await res.json();

      if (response.status === 200) {
        setInfo(response.data);
      } else {
        alert("잠시후 다시 시도해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchUser.length > 0) {
      getUserCommentInfo(Number(param.get("id")));
    }
  }, [searchUser, param]);

  if (!info) return null;

  return (
    <>
      <UserPublicInfo user={info.user_info} />
      <UserCommentAll comments={info.data} />
      <Pagination
        total={info.max_pages}
        routeLink={"/user/comment?id="}
        currentPage={Number(param.get("id"))}
      />
    </>
  );
}
