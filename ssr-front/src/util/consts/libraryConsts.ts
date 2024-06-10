export const YOUTUBE_OPTION = {
  height: "280",
  width: "480",
  playerVars: {
    autoplay: 0,
  },
} as const;

export const MOT_IMAGE_SLIDER_OPTION = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  draggable: false,
} as const;

export const MAIN_IMAGE_SLIDER_OPTION = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  draggable: false,
} as const;
