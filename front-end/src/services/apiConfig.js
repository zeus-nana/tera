import { BASE_API_URL } from "../constants.js";

export const API_CONFIG = {
  BASE_URL: BASE_API_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: "auth/login",
      LOGOUT: "auth/logout",
      VERIFY: "auth/verify",
      CHANGE_PASSWORD: "auth/change-password",
      CURRENT_USER: "auth/current-user",
    },
    USERS: {
      USERS: "/users",
      CHANGE_PASSWORD: "users/change-password",
    },
    ADMIN: {
      USERS: "/admin/users",
      ACTIVATE_USER: "/admin/activate-user",
      DEACTIVATE_USER: "/admin/deactivate-user",
      RESET_USER_PASSWORD: "/admin/reset-user-password",
      LOGIN: "/admin/login",
    },
  },
};
