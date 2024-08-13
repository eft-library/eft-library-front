import { MAX_UUID_COUNT, LOCAL_STORAGE_KEY } from "@/util/consts/libraryConsts";
import { useEffect } from "react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useSession } from "next-auth/react";

export default function useViewCount(boardId: string, boardType: string) {
  const { data: session } = useSession();
  useEffect(() => {
    const addBoardViewCount = async () => {
      try {
        const res = await fetch(`${USER_API_ENDPOINTS.ADD_BOARD_VIEW_COUNT}`, {
          method: "POST",
          headers: {
            Authorization:
              session && session.accessToken
                ? `Bearer ${session.accessToken}`
                : "Bearer ",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board_id: boardId,
            board_type: boardType,
          }),
        });
        const response = await res.json();
      } catch (error) {
        console.log(error);
      }
    };

    if (boardId && session) {
      console.log("asdas");
      // 로컬 스토리지에서 UUID 목록 가져오기
      const storedUuids =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

      // 새로 들어온 board_id가 이미 목록에 존재하는지 확인
      if (!storedUuids.includes(boardId)) {
        // UUID 목록이 10만 개를 초과할 경우 목록을 비움
        if (storedUuids.length >= MAX_UUID_COUNT) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        // 새로운 게시판 id 추가
        const updatedUuids = [
          ...(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []),
          boardId,
        ];

        // 업데이트된 UUID 목록을 로컬 스토리지에 저장
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUuids));

        // 조회수 통신
        addBoardViewCount();
      }
    }
  }, [boardId]);
}
