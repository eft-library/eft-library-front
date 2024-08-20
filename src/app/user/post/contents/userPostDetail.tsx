"use client";

import UserPublicInfo from "@/components/userPublicInfo/userPublicInfo";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/endPoints";
import { useAppStore } from "@/store/provider";
import type { UserPost } from "@/types/types";

export default function UserPostDetail() {
  const { searchUser } = useAppStore((state) => state);
  const [info, setInfo] = useState<UserPost>();

  useEffect(() => {
    const getUserPostInfo = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.GET_USER_POST_DETAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: searchUser,
          }),
        });
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

    if (searchUser.length > 0) {
      getUserPostInfo();
    }
  }, [searchUser]);

  if (!info) return null;

  return (
    <>
      <UserPublicInfo user={info.user_info} />
    </>
  );
}
