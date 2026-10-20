// Turns an api error into an Error with the message of the api and its field errors (CustomResponse.data).
export const toRequestError = (error, defaultMessage) => {
  const customResponse = error.response?.data;
  const requestError = new Error(customResponse?.message ?? defaultMessage);
  requestError.fieldErrors = customResponse?.data ?? {};
  return requestError;
};
