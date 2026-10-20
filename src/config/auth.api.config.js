export const authConfig = {
  host: import.meta.env.VITE_API_HOST ? `${import.meta.env.VITE_API_HOST}/auth` : "",
  endpoint: {
    login: "/login",
    me: "/me",
  },
};
