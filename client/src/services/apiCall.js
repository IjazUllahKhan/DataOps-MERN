import axios from "axios";

export const commonRequest = async (
  url,
  method = "GET",
  header = null,
  body = null
) => {
  const config = {
    method,
    url,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
    data: body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response || { message: error.message };
  }
};
