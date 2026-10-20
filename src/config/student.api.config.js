export const studentConfig = {
  host: import.meta.env.VITE_API_HOST ? `${import.meta.env.VITE_API_HOST}/student` : "",
  endpoint: {
    getAllStudents: "/getAllStudents",
  },
};
