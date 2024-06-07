import Logo from "@/assets/logo";
import { Box } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box display={"flex"} flexDirection={"column"}>
        <span>404 ERROR</span>
        <span>Page Not Found</span>
        <span>죄송합니다. 페이지를 찾을 수 없습니다.</span>
      </Box>
      <Logo width={400} height={300} />
    </Box>
  );
}
