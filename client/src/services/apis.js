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

export const usersGetAPI = async (search, gender) => {
  const response = await commonRequest(
    `${BASE_URL}/user/home?search=${search}&gender=${gender}`,
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

export const updateUserAPI = async (id, data, header) => {
  const response = await commonRequest(
    `${BASE_URL}/user/edit/${id}`,
    "PUT",
    header,
    data
  );
  return response;
};

export const deleteUserAPI = async (id) => {
  const response = await commonRequest(
    `${BASE_URL}/user/delete/${id}`,
    "DELETE",
    null,
    {}
  );
  return response;
};
