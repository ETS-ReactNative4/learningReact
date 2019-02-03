import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

httpService.setJWT(localStorage.getItem(config.validationToken));

async function loginUser(loginData) {
  try {
    console.log(config.apiAuthEndPoint);
    const { data: jwt } = await httpService.post(
      config.apiAuthEndPoint,
      loginData
    );
    localStorage.setItem(config.validationToken, jwt);
    httpService.setJWT(jwt);
  } catch (ex) {
    return ex.response.data;
  }
}

async function registerUser(user) {
  try {
    const { headers } = await httpService.post(config.apiUserEndPoint, user);
    localStorage.setItem(
      config.validationToken,
      headers[config.validatingHeader]
    );
    httpService.updateHeader();
  } catch (ex) {
    return ex.response.data;
  }
}

function logOut() {
  localStorage.removeItem(config.validationToken);
  httpService.setJWT(undefined);
}

function getUser() {
  const jwt = localStorage.getItem(config.validationToken);
  let userData = {};
  if (jwt && jwt !== "") {
    userData = jwtDecode(jwt);
  }
  return userData;
}

export default {
  loginUser,
  logOut,
  registerUser,
  getUser
};
