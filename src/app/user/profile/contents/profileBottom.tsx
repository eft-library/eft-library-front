import { Box } from "@chakra-ui/react";
import type { ProfileBotton } from "@/types/types";
import ProfileBottomPost from "./profileBottonPost";
import ProfileBottomComment from "./profileBottonComment";

export default function ProfileBottom({ user_posts }: ProfileBotton) {
  return (
    <Box
      w="100%"
      mt={16}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <ProfileBottomPost user_posts={user_posts} />
      <ProfileBottomComment user_posts={user_posts} />
    </Box>
  );
}
