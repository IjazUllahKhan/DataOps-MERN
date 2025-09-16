import { commonRequest } from "./apiCall";
import { BASE_URL } from "./helper";

export const registerAPI = async (data, header) => {
  const response = await commonRequest(
    `${BASE_URL}/user/register`,
    "POST",
    header,
    data
  );
  return response;
};

export const usersGetAPI = async () => {
  const response = await commonRequest(
    `${BASE_URL}/user/home`,
    "GEt",
    null,
    ""
  );
  return response;
};

export const singleUserGetAPI = async (id) => {
  const response = await commonRequest(
    `${BASE_URL}/user/profile/${id}`,
    "GET",
    null,
    ""
  );
  return response;
};
