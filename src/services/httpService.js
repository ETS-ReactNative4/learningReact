import Axios from "axios";
import loggerService from "./loggerService";

Axios.interceptors.response.use(null, error => {
  const expectedResult =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedResult) {
    loggerService.logError(error);
  }
  return Promise.reject(error);
});

export default {
  get: Axios.get,
  post: Axios.post,
  patch: Axios.patch,
  put: Axios.put,
  delete: Axios.delete
};
