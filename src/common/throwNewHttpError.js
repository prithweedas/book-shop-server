const throwNewHttpError = (message, status) => {
  message = message || "Something Went Wrong";
  status = status || 500;
  const error = new Error(message);
  error.status = status;
  return error;
};

export default throwNewHttpError;
