"use client";

import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useRouter } from "next/navigation";

export default function ProfileDetail() {
  return (
    <Box w="95%" h="100%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="100%">
          <Text fontWeight={600} p={2}>
            기본 정보
          </Text>
          <Box
            w="100%"
            borderRadius="lg"
            border="1px solid"
            borderColor={ALL_COLOR.WHITE}
            p={4}
            h="28vh"
          />
        </Box>

        <Box
          w="100%"
          mt={16}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {["내 게시글", "내 댓글"].map((title) => (
            <Box
              key={title}
              w="45%"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box w="100%">
                <Text fontWeight={600} p={2}>
                  {title}
                </Text>
              </Box>
              <Box
                w="100%"
                border="1px solid"
                borderRadius="lg"
                borderColor={ALL_COLOR.WHITE}
                p={4}
                h="40vh"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
