// The api sends dates as "YYYY-MM-DD"; the app shows them as "DD/MM/YYYY".
export const formatDate = (date) => (date ? date.split("-").reverse().join("/") : "-");
