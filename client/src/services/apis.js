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
