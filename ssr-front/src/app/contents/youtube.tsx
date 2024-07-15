import { YouTubeEmbed } from "@next/third-parties/google";
import { Box } from "@chakra-ui/react";

export default function YoutubeNews({ youtubeId }) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <YouTubeEmbed videoid={youtubeId} height={280} width={480} />
    </Box>
  );
}
