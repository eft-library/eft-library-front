const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const USER_API_ENDPOINTS = {
  ADD_USER: baseUrl + "/api/user/add",
  GET_USER_INFO: baseUrl + "/api/user/get",
  GET_USER_QUEST: baseUrl + "/api/user/quest",
  DELETE_USER_QUEST: baseUrl + "/api/user/quest/delete",
  UPDATE_USER_QUEST: baseUrl + "/api/user/quest/update",
};

export default USER_API_ENDPOINTS;
