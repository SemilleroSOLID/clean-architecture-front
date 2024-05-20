export const convocationConfig = {
    host: `${import.meta.env.VITE_API_HOST}/convocation` || "",
    endpoint:{
      getAllConvocationTypes: "/getAllConvocationTypes",
    }
  };
  