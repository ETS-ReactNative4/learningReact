import httpService from "./httpService";
import config from "../config.json";

function loginUser(loginData) {
  return httpService.post(config.apiAuthEndPoint, loginData);
}

export default {
  loginUser
};
