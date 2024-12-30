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

export const QUILL_FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "float",
  "height",
  "width",
];

export const COMMENT_FORMAT = [
  "link",
  "image",
  "video",
  "float",
  "height",
  "width",
];

export const MAX_UUID_COUNT = 100000;
export const LOCAL_STORAGE_KEY = "board_id_list";

export const COOKIE_NAME = "main_popup";
export const COOKIE_EXPIRY_DAYS = 1; // 쿠키 만료일 (하루)
