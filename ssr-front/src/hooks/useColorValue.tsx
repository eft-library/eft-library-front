"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useColorModeValue } from "@chakra-ui/react";

// 왼쪽이 라이트 모드
export default function useColorValue() {
  const backWhite = useColorModeValue(ALL_COLOR.BACKGROUND, ALL_COLOR.WHITE);
  const whiteMapBlack = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.MAP_BLACK);
  const whiteBack = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.BACKGROUND);
  const whiteBlack = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.BLACK);
  const darkLightgray = useColorModeValue(
    ALL_COLOR.DARK_GRAY,
    ALL_COLOR.LIGHT_GRAY
  );
  const lightDarkgray = useColorModeValue(
    ALL_COLOR.LIGHT_GRAY,
    ALL_COLOR.DARK_GRAY
  );
  const whiteBlackShadow = useColorModeValue(
    ALL_COLOR.WHITE_SHADOW,
    ALL_COLOR.BLACK_SHADOW
  );
  const yellowShadow = useColorModeValue(
    ALL_COLOR.YELLOW_SHADOW,
    ALL_COLOR.YELLOW_SHADOW
  );
  const blackWhite = useColorModeValue(ALL_COLOR.BLACK, ALL_COLOR.WHITE);
  const orange = useColorModeValue(ALL_COLOR.ORANGE, ALL_COLOR.ORANGE);
  const lightDarkYellow = useColorModeValue(
    ALL_COLOR.YELLOW,
    ALL_COLOR.DARK_YELLOW
  );
  const darkLightYellow = useColorModeValue(
    ALL_COLOR.DARK_YELLOW,
    ALL_COLOR.YELLOW
  );
  const red = useColorModeValue(ALL_COLOR.RED, ALL_COLOR.RED);
  const beige = useColorModeValue(ALL_COLOR.BEIGE, ALL_COLOR.BEIGE);
  const scrollThumb = useColorModeValue(
    ALL_COLOR.SCROLL_THUMB,
    ALL_COLOR.SCROLL_THUMB
  );
  const scrollTrack = useColorModeValue(
    ALL_COLOR.SCROLL_TRACK,
    ALL_COLOR.SCROLL_TRACK
  );
  const scrollHover = useColorModeValue(
    ALL_COLOR.SCROLL_HOVER,
    ALL_COLOR.SCROLL_HOVER
  );
  const threBack = useColorModeValue(
    ALL_COLOR.THREE_BACKGROUND,
    ALL_COLOR.THREE_BACKGROUND
  );

  return {
    whiteBack,
    whiteBlack,
    darkLightgray,
    whiteMapBlack,
    whiteBlackShadow,
    blackWhite,
    backWhite,
    lightDarkgray,
    yellowShadow,
    orange,
    darkLightYellow,
    lightDarkYellow,
    red,
    beige,
    scrollHover,
    scrollThumb,
    scrollTrack,
    threBack,
  };
}
