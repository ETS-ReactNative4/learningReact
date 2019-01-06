import httpService from "./httpService";
import config from "../config.json";

function registerUser(user) {
  return httpService.post(config.apiUserEndPoint, user);
}

export default {
  registerUser
};
