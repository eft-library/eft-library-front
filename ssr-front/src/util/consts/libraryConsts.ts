export const YOUTUBE_OPTION = {
  height: "280",
  width: "480",
  playerVars: {
    autoplay: 0,
  },
} as const;

export type YoutubeOptionKeys = keyof typeof YOUTUBE_OPTION;

export const MOT_IMAGE_SLIDER_OPTION = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  draggable: false,
} as const;

export type MotImageSliderOptionKeys = keyof typeof MOT_IMAGE_SLIDER_OPTION;

export const MAIN_IMAGE_SLIDER_OPTION = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  draggable: false,
} as const;

export type MainImageSliderOptionKeys = keyof typeof MAIN_IMAGE_SLIDER_OPTION;
