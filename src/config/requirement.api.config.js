export const requirementConfig = {
    host: `${import.meta.env.VITE_API_HOST}/requirements` || "",
    endpoint: {
        getAllRequirements: "/getAllRequirements",
        getAllConditionRequirements: "/getAllConditionRequirements"
    }
};
