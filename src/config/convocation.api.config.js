export const convocationConfig = {
  host: `${import.meta.env.VITE_API_HOST}/convocation` || "",
  endpoint: {
    getAllConvocationTypes: "/getAllConvocationTypes",
    getConditionRequirements: "/getAllConditionConvocation",
    getTypeRequirements: "/getAllRequirmentsTypes",
    createConvocation: "/createConvocation",
  }
};
