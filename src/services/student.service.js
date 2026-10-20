import axios from "axios";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { studentConfig } from "../config/student.api.config.js";
import { toRequestError } from "../utils/requestError.util.js";

export const getAllStudents = async () => {
  try {
    const response = await axios.get(getEndpoint(studentConfig, "getAllStudents"));
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, "No se pudieron cargar los estudiantes");
  }
};
