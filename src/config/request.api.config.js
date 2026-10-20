export const requestConfig = {
  host: import.meta.env.VITE_API_HOST ? `${import.meta.env.VITE_API_HOST}/request` : "",
  endpoint: {
    createRequest: "/createRequest",
    getAllRequests: "/getAllRequests",
    getRequestById: "/getRequestById",
  },
};
