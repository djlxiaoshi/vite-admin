import config from "@/config";
import http from "./index";

export const login = (state?: string) => {
  const redirectUrl =
    state ||
    encodeURIComponent(`${window.location.protocol}//${window.location.host}/`);
  window.location.replace(
    config.LOGIN_REDIRECT_HOST + `&callback=${encodeURIComponent(redirectUrl)}`
  );
};

export const logout = () => {
  return http.request({
    method: "post",
    url: "/logout",
  });
};

export const getUser = () => {
  return http.request({
    method: "post",
    url: "/user/info",
  });
};
