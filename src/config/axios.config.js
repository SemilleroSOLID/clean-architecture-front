import axios from "axios";
import { authConfig } from "./auth.api.config.js";
import { LINKS } from "../constants/links.constant.js";
import { SESSION_END_REASONS } from "../constants/auth.constant.js";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { clearSession, readSession } from "../utils/session.util.js";

// Every request carries the token of the session, and a 401 (expired or invalid token) ends it (#23).
export const setupAxios = () => {
  axios.interceptors.request.use((config) => {
    const session = readSession();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Wrong credentials in the login are not an expired session: the login page shows the message.
      const isLogin = error.config?.url === getEndpoint(authConfig, "login");
      if (error.response?.status === 401 && !isLogin) {
        clearSession();
        window.location.assign(`${LINKS.login.url}?reason=${SESSION_END_REASONS.expired}`);
      }
      return Promise.reject(error);
    }
  );
};
