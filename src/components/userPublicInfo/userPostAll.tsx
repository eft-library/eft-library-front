import { Box } from "@chakra-ui/react";
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
      {posts.map((post) => (
        <BoardPost key={post.id} post={post} />
      ))}
    </Box>
  );
}
