import { commonRequest } from "./apiCall";
import { BASE_URL } from "./helper";

// Register api
export const registerAPI = async (data, header) => {
  const response = await commonRequest(
    `${BASE_URL}/user/register`,
    "POST",
    header,
    data
  );
  return response;
};

// User get api
export const usersGetAPI = async (search, gender, status, sort, page) => {
  const response = await commonRequest(
    `${BASE_URL}/user/home?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
    "GEt",
    null,
    ""
  );
  return response;
};

// Single user get api

export const singleUserGetAPI = async (id) => {
  const response = await commonRequest(
    `${BASE_URL}/user/profile/${id}`,
    "GET",
    null,
    ""
  );
  return response;
};

// update user api

export const updateUserAPI = async (id, data, header) => {
  const response = await commonRequest(
    `${BASE_URL}/user/edit/${id}`,
    "PUT",
    header,
    data
  );
  return response;
};

// Delete user api

export const deleteUserAPI = async (id) => {
  const response = await commonRequest(
    `${BASE_URL}/user/delete/${id}`,
    "DELETE",
    null,
    {}
  );
  return response;
};

// Status update api

export const StatusUpdateAPI = async (id, status) => {
  const response = await commonRequest(
    `${BASE_URL}/user/status/${id}`,
    "PUT",
    null,
    { status }
  );
  return response;
};

// Export csv api

export const csvExportAPI = async () => {
  const response = await commonRequest(
    `${BASE_URL}/user/csvExport`,
    "GET",
    null,
    ""
  );

  return response;
};
