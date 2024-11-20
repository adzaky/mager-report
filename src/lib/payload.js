export const successPayload = (response) => {
  return {
    status: "success",
    data: response.data,
    message: response.message,
    code: response.code,
  };
};

export const errorPayload = (response) => {
  return {
    status: "error",
    message: response.message,
    code: response.code,
  };
};
