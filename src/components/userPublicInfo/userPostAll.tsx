import { Box, Text } from "@chakra-ui/react";
import BoardPost from "../board/boardPost";
import type { UserPostAll } from "@/types/types";

export default function UserPostAll({ posts }: UserPostAll) {
  return (
    <Box
      w="98%"
      p={4}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {posts.length > 0 ? (
        posts.map((post) => <BoardPost key={post.id} post={post} />)
      ) : (
        <Text fontWeight={800} mt={10}>
          작성한 글이 없습니다.
        </Text>
      )}
    </Box>
  );
}
