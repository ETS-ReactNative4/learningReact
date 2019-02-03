import Axios from "axios";
import loggerService from "./loggerService";
import config from "../config.json";

Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

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

function setJWT(jwt) {
  Axios.defaults.headers.common[config.validatingHeader] = jwt;
}

export default {
  get: Axios.get,
  post: Axios.post,
  patch: Axios.patch,
  put: Axios.put,
  delete: Axios.delete,
  setJWT
};
