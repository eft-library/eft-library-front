const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const USER_API_ENDPOINTS = {
  ADD_USER: baseUrl + "/api/user/add",
  CHANGE_USER_NICKNAME: baseUrl + "/api/user/nickname/change",
  DELETE_USER: baseUrl + "/api/user/delete",
  CHANGE_USER_ICON: baseUrl + "/api/user/icon/change",
  GET_USER_INFO: baseUrl + "/api/user/get",
  GET_USER_QUEST: baseUrl + "/api/user/quest",
  DELETE_USER_QUEST: baseUrl + "/api/user/quest/delete",
  UPDATE_USER_QUEST: baseUrl + "/api/user/quest/update",
  ADD_POST: baseUrl + "/api/board/add",
  UPDATE_POST: baseUrl + "/api/board/update",
  UPDATE_COMMENT: baseUrl + "/api/comment/update",
  ADD_COMMENT: baseUrl + "/api/comment/add",
  DELETE_COMMENT: baseUrl + "/api/comment/delete",
  LIKE_OR_DIS_COMMENT: baseUrl + "/api/comment/like_or_dis",
  CHANGE_LIKE: baseUrl + "/api/board/like",
  IS_LIKE_POST: baseUrl + "/api/board/user/like",
  GET_USER_POST: baseUrl + "/api/board/user/write",
  REPORT_POST: baseUrl + "/api/board/report",
  DELETE_POST: baseUrl + "/api/board/delete",
  REPORT_COMMENT: baseUrl + "/api/comment/report",
  BAN_USER: baseUrl + "/api/user/ban",
  ADD_BOARD_VIEW_COUNT: baseUrl + "/api/board/view",
};

export default USER_API_ENDPOINTS;
